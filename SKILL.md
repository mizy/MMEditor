---
name: mmeditor
description: Use this skill when working with MMEditor graphs, demos, or integrations. It helps create or modify SVG flow-editor examples, initialize MMEditor correctly, register custom nodes or lines, wire graph and editor events, and choose the right demo or document entrypoint in the MMEditor package.
---

# MMEditor Skill

Use this skill for tasks inside projects that depend on `mmeditor`, or when the user wants help building flows with MMEditor.

## What To Do

- Prefer `import MMEditor from "mmeditor"` for app integration.
- Use `window.MMEditor` only for browser-script examples that load `dist/MMEditor.browser.js`.
- Initialize with a real DOM container, then populate data through `editor.schema.setInitData(...)` or incremental graph APIs.
- After loading or mutating graph data, prefer `editor.schema.format()` and `editor.controller.autoFit()` to produce a readable first view.
- For extensions, use `graph.node.registeNode(...)` for custom nodes and `graph.line.registeLine(...)` for custom lines.
- Attach business behavior through `graph.on(...)` or `editor.on(...)` instead of patching internal rendering code.

## Entry Points

- Package entry: `src/index.ts`
- Main README: `README.md`
- Docs index: `docs/README.md`
- Getting started: `docs/get-started.md`
- Demo navigation: `docs/demos.md`
- Custom shapes: `docs/custom-shape.md`
- Events: `docs/events.md`
- Migration notes: `docs/migration-from-nebulagraph-veditor.md`

## Working Rules

- Treat APIs documented in README and `docs/` as the public surface.
- Do not rely on undocumented deep imports unless the user explicitly accepts unstable internals.
- `Minimap` is the documented plugin entry today.
- `BrushSelector` exists in source/types, but is not a documented stable public feature.

## Typical Pattern

```ts
import MMEditor from "mmeditor";

const editor = new MMEditor({
  dom: document.getElementById("root") as HTMLDivElement,
  showMiniMap: true,
});

await editor.schema.setInitData({ nodes: [], lines: [] });
editor.schema.format();
editor.controller.autoFit();
```

## When You Need More Detail

- Read `docs/get-started.md` for initialization and data loading.
- Read `docs/custom-shape.md` before implementing custom node or line types.
- Read `docs/events.md` when wiring interactions or editor events.
- Read `docs/demos.md` to pick the closest runnable example before writing new sample code.
