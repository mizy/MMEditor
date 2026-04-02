# public 示例说明

这个目录放的是浏览器独立 HTML 示例，适合验证 script 方式接入和单能力场景。

## 启动前置

1. 执行 `npm run build:browser`
2. 确认产物存在：`dist/MMEditor.browser.js`
3. 再打开本目录下的 HTML 页面

说明：

- 这些示例通过 `<script src="../dist/MMEditor.browser.js"></script>` 暴露 `window.MMEditor`
- 如果只执行了 `npm start`，但没有构建浏览器版产物，独立页面可能无法正常运行

## 示例列表

### basic.html

- 入口定位：最基础的浏览器接入示例
- 适用场景：验证默认节点、默认连线、随机数据生成
- 关键能力：`new MMEditor`、`addNode`、`addLine`

### shape.html

- 入口定位：自定义节点示例
- 适用场景：验证 `registeNode`、`linkPoints`、SVG 自定义渲染
- 关键能力：`Utils.SVGHelper`、`Utils.dom.setAttrs`

### flowChart.html

- 入口定位：流程图布局示例
- 适用场景：验证已有数据回填、dagre 自动布局、缩放与适配
- 关键能力：`schema.setData`、`schema.format`、`controller.autoScale`、`controller.autoFit`

### graph.html

- 入口定位：动态图与事件联动示例
- 适用场景：验证外部布局引擎驱动、图关系更新、多边排序
- 关键能力：`graph.on`、`graph.update`、`Utils.makeLineSort`

### dev.html

- 入口定位：开发态 React 编辑台宿主页
- 使用方式：通常由 `npm start` 自动打开，不单独维护示例逻辑

### demo.html

- 入口定位：生产态 demo 宿主页
- 使用方式：配合 `npm run build:demo` 产物使用

## 阅读顺序建议

先看 `basic.html`，再看 `shape.html`、`flowChart.html`、`graph.html`。如果需要完整编辑台，再回到 `../demo/README.md` 和 `npm start`。
