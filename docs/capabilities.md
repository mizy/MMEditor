# 能力矩阵与边界

本页用于说明 MMEditor 当前仓库里哪些能力已经验证，哪些只是部分接入，哪些尚未作为正式能力公开。

## 公开导出

src/index.ts 当前导出：

- MMEditor
- Utils
- Node
- Line
- Schema
- DefaultLine
- DefaultNode
- Graph
- History
- AnchorLine
- Controller
- Minimap
- Event

说明：

- Minimap 已纳入公开导出。
- BrushSelector 没有出现在 src/index.ts 中，因此不是当前正式公开 API。

## 已验证能力

- SVG 画布编辑
  - 可通过 npm 集成和浏览器脚本两种方式使用。
- 节点与连线创建
  - 支持 graph.node.addNode 与 graph.line.addLine。
- 自定义节点与连线
  - 支持 registeNode 与 registeLine。
- 数据导入导出
  - 支持 schema.setData、setInitData、getData。
- 历史记录
  - 支持 undo、redo，并对关键事件自动入栈。
- 自动布局
  - 支持 dagre 布局和 dagreOption 配置。
- 视口控制
  - 支持 autoFit、autoScale、pan、zoom、transform。
- 小地图
  - showMiniMap 为 true 时会初始化 Minimap。
- 键盘交互
  - 支持删除、复制、粘贴、撤销、重做快捷键链路。
- React 编辑台示例
  - npm start 可启动一个完整的业务化示例。

## 部分集成能力

- 浏览器版构建产物
  - 仓库当前已包含 dist/MMEditor.browser.js；如从源码重新检出或清理产物，需要执行 npm run build:browser 重新生成。
- 类型产物
  - package.json 声明了 types 为 ./types/index.d.ts，仓库当前也已生成对应声明文件。
- Typedoc
  - package.json 提供 doc 脚本，但仓库未提供现成 docs/API 站点或 typedoc 配置产物。
- 模式控制
  - mode 支持 edit 和 view，键盘编辑逻辑已识别 view，但更细粒度只读行为仍需业务自行约束。

## 未公开或不应对外承诺的能力

- BrushSelector
  - 只有 src/Plugins/BrushSelector.ts 源码，未导出、未接线、无正式示例。
- 在线 API 文档站点
  - 当前没有稳定交付物。
- Vue / Canvas 等多渲染技术支持
  - 当前仓库可证实的是 SVG 体系和 React demo，不应泛化宣传。

## 构建与分发说明

- lint
  - npm run lint，执行 TypeScript 类型检查。
- test
  - npm test，执行 build、build:browser、build:demo 和 makeDts 这组构建级冒烟校验。
- main
  - dist/MMEditor.js
- types
  - types/index.d.ts
  - 类型声明已生成，但正式公开 API 仍以包主入口和已文档化能力为准，不建议依赖未文档化的深层路径。
- 开发入口
  - webpack.config.js -> demo/app.js -> public/dev.html
- 库构建入口
  - webpack.config.build.js -> src/index.ts
- 浏览器版构建产物名
  - dist/MMEditor.browser.js

## 典型使用边界

- 适合：
  - 流程图编辑
  - 作业编排
  - DAG 可视化
  - 有向关系图与节点配置界面

- 当前不适合直接承诺：
  - 开箱即用的多框架 UI 套件
  - 完整插件市场
  - 已发布的 API 门户

## 维护建议

- 新增能力时，先更新 README 的总览入口，再更新本页状态。
- 只有在满足“导出存在 + 示例可跑 + 文档可达”三个条件后，才应把能力升级为正式公开能力。
