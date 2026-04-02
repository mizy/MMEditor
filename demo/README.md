# React 编辑台 demo 说明

这个目录承载 MMEditor 当前最完整的业务级示例。

## 入口与启动

- 启动命令：`npm start`
- 默认访问地址：`http://localhost:7798/dev.html`
- 入口链路：
  - `webpack.config.js` 把 `demo/app.js` 作为 dev server 入口
  - `public/dev.html` 提供 `#root`
  - `demo/app.js` 挂载 React 应用
  - `demo/index.js` 实现主要交互

## 适用场景

- 想快速了解 MMEditor 在实际编辑台中的组织方式
- 想参考拖拽建图、右键菜单、属性面板和小地图接入
- 想找一个可直接改造的二次开发底稿

## 关键交互

- 左侧栏：拖拽组件到画布创建节点
- 顶部栏：承载数据导入导出和编辑操作
- 右侧栏：展示当前选中节点的属性
- 画布区域：负责节点拖拽、连线、选中和空白区点击
- 右键菜单：对节点执行上下文操作
- 小地图：通过 `showMiniMap: true` 自动启用

## 关键示例价值

- 展示了 `schema.setInitData`、`schema.format`、`controller.autoFit` 的典型组合用法
- 展示了 `graph.on('node:click')`、`graph.on('paper:click')` 等编辑态事件接法
- 展示了通过 `registeNode` 扩展节点类型和通过 `checkNewLine` 约束连线规则
- 展示了 MMEditor 如何和 React 状态、右侧表单、右键菜单组合使用

## 建议先读的文件

- `demo/index.js`
  - 主流程、事件绑定、节点注册、初始化数据
- `demo/Content/LeftBar.js`
  - 组件面板和拖拽来源
- `demo/Content/TopBar.js`
  - 顶部操作区
- `demo/Content/RightBar.js`
  - 右侧属性区
- `demo/Content/RightMenu.js`
  - 节点右键菜单

## 使用提醒

- 这个 demo 用于说明编辑器集成方式，不代表官方 UI 框架绑定方案。
- 若只需要验证浏览器版全局脚本接入，优先看 `../public/basic.html` 和 `../public/README.md`。
