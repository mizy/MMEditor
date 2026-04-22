const fs = require("fs");
const fsp = require("fs/promises");
const http = require("http");
const https = require("https");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");
const { URL } = require("url");
const WebSocket = require("ws");

function getChromeCandidates() {
  const platformCandidates =
    process.platform === "darwin"
      ? [
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
          "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
        ]
      : process.platform === "win32"
      ? [
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
          "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
          "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
          "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
        ]
      : [
          "/usr/bin/google-chrome",
          "/usr/bin/google-chrome-stable",
          "/usr/bin/chromium",
          "/usr/bin/chromium-browser",
          "/usr/bin/microsoft-edge",
        ];

  return [...new Set([process.env.CHROME_BIN, ...platformCandidates].filter(Boolean))];
}

const chromeCandidates = getChromeCandidates();

function getContentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".json")) return "application/json; charset=utf-8";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
}

function createStaticServer(rootDir) {
  return http.createServer((req, res) => {
    const requestUrl = new URL(req.url, "http://127.0.0.1");
    const relativePath = decodeURIComponent(requestUrl.pathname.replace(/^\/+/, ""));
    const filePath = path.resolve(rootDir, relativePath || "index.html");
    if (!filePath.startsWith(rootDir)) {
      res.writeHead(403);
      res.end("forbidden");
      return;
    }
    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(error.code === "ENOENT" ? 404 : 500);
        res.end(error.code === "ENOENT" ? "not found" : String(error));
        return;
      }
      res.writeHead(200, {
        "Content-Type": getContentType(filePath),
      });
      res.end(content);
    });
  });
}

async function wait(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url) {
  const requestUrl = new URL(url);
  const transport = requestUrl.protocol === "https:" ? https : http;
  return new Promise((resolve, reject) => {
    const req = transport.get(requestUrl, (res) => {
      if (!res.statusCode) {
        reject(new Error("Request failed: missing status code"));
        return;
      }
      if (res.statusCode < 200 || res.statusCode >= 300) {
        res.resume();
        reject(
          new Error(`Request failed: ${res.statusCode} ${res.statusMessage || ""}`.trim())
        );
        return;
      }
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    });
    req.on("error", reject);
  });
}

async function waitForDebugger(userDataDir, browser) {
  const activePortPath = path.join(userDataDir, "DevToolsActivePort");
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (browser.exitCode !== null) {
      throw new Error("Chrome exited before DevTools endpoint became ready");
    }
    try {
      const activePort = await fsp.readFile(activePortPath, "utf8");
      const [port] = activePort.trim().split(/\r?\n/);
      if (!port) {
        throw new Error("DevToolsActivePort did not include a port");
      }
      return await fetchJson(`http://127.0.0.1:${port}/json/version`);
    } catch (error) {
      await wait(100);
    }
  }
  throw new Error("Chrome DevTools endpoint did not become ready");
}

function createCdpClient(webSocketUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(webSocketUrl);
    const pending = new Map();
    let commandId = 0;

    ws.on("message", (rawData) => {
      const message = JSON.parse(String(rawData));
      if (!message.id) {
        return;
      }
      const callback = pending.get(message.id);
      if (!callback) {
        return;
      }
      pending.delete(message.id);
      if (message.error) {
        callback.reject(new Error(message.error.message));
        return;
      }
      callback.resolve(message.result);
    });

    ws.once("open", () => {
      resolve({
        send(method, params = {}, sessionId) {
          commandId += 1;
          const id = commandId;
          const payload = { id, method, params };
          if (sessionId) {
            payload.sessionId = sessionId;
          }
          ws.send(JSON.stringify(payload));
          return new Promise((resolveCommand, rejectCommand) => {
            pending.set(id, { resolve: resolveCommand, reject: rejectCommand });
          });
        },
        close() {
          ws.close();
        },
      });
    });

    ws.once("error", reject);
  });
}

async function runBrowserCase(browserPath, targetUrl) {
  const userDataDir = await fsp.mkdtemp(path.join(os.tmpdir(), "mmeditor-edge-label-"));
  const browser = spawn(
    browserPath,
    [
      "--headless=new",
      "--disable-gpu",
      "--remote-debugging-port=0",
      `--user-data-dir=${userDataDir}`,
      "--no-first-run",
      "--no-default-browser-check",
      "about:blank",
    ],
    {
      stdio: ["ignore", "ignore", "pipe"],
    }
  );

  let stderr = "";
  let spawnError = null;
  browser.once("error", (error) => {
    spawnError = error;
  });
  browser.stderr.on("data", (chunk) => {
    stderr += String(chunk);
  });

  const closeBrowser = async () => {
    if (browser.exitCode !== null) {
      return;
    }
    browser.kill("SIGTERM");
    await Promise.race([
      new Promise((resolve) => browser.once("exit", resolve)),
      wait(3000),
    ]);
  };

  try {
    if (spawnError) {
      throw spawnError;
    }
    const version = await waitForDebugger(userDataDir, browser);
    if (!version.webSocketDebuggerUrl) {
      throw new Error("Chrome DevTools endpoint did not expose a webSocketDebuggerUrl");
    }
    const client = await createCdpClient(version.webSocketDebuggerUrl);
    try {
      const { targetId } = await client.send("Target.createTarget", { url: targetUrl });
      const { sessionId } = await client.send("Target.attachToTarget", {
        targetId,
        flatten: true,
      });
      await client.send("Runtime.enable", {}, sessionId);
      await client.send("Page.enable", {}, sessionId);

      for (let attempt = 0; attempt < 100; attempt += 1) {
        const { result } = await client.send(
          "Runtime.evaluate",
          {
            returnByValue: true,
            expression: `(() => {
              const el = document.getElementById("result");
              return el ? { pass: el.dataset.pass, text: el.textContent } : null;
            })()`,
          },
          sessionId
        );
        const value = result && result.value;
        if (value && value.text !== "pending") {
          if (value.pass !== "true") {
            throw new Error(`edgeLabelRectRefresh browser test failed\n${value.text}`);
          }
          return;
        }
        await wait(100);
      }

      throw new Error("Timed out waiting for browser test result");
    } finally {
      client.close();
    }
  } catch (error) {
    throw new Error(`${error.message}\n${stderr}`.trim());
  } finally {
    await closeBrowser();
    await fsp.rm(userDataDir, { recursive: true, force: true });
  }
}

async function main() {
  const rootDir = path.resolve(__dirname, "..");
  const server = createStaticServer(rootDir);
  const targetUrl = await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve(`http://127.0.0.1:${address.port}/public/edgeLabelRectRefresh.spec.html`);
    });
  });

  let lastError = null;
  try {
    for (const browserPath of chromeCandidates) {
      try {
        await runBrowserCase(browserPath, targetUrl);
        process.stdout.write("edgeLabelRectRefresh browser test passed\n");
        return;
      } catch (error) {
        lastError = error;
      }
    }
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  if (!chromeCandidates.length) {
    throw new Error("No browser candidate configured; set CHROME_BIN to a Chrome/Edge executable");
  }

  throw lastError || new Error("No supported browser found for edgeLabelRectRefresh test");
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exit(1);
});
