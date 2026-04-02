# MMEditor

MMEditor 是一个基于 SVG 的流程图编辑器，适合承载节点编排、依赖关系展示、流程配置和图形化编辑场景。

## 项目定位

- 核心能力是 SVG 画布编辑、节点/连线扩展、数据导入导出、自动布局、视口控制和小地图。
- 仓库同时提供两类入口：
  - npm 包接入，面向业务应用集成。
  - 浏览器脚本与 React demo，面向示例验证和二次开发。
- 当前文档以仓库现状为准，不承诺尚未落地的 API 站点或未公开插件入口。

## 快速开始

### npm 集成

```sh
npm install mmeditor
```

```ts
import MMEditor from "mmeditor";

const editor = new MMEditor({
  dom: document.getElementById("root") as HTMLDivElement,
  showMiniMap: true,
});

await editor.schema.setInitData({
  nodes: [
    {
      uuid: "start",
      type: "default",
      name: "Start",
      x: 40,
      y: 40,
    },
    {
      uuid: "end",
      type: "default",
      name: "End",
      x: 260,
      y: 180,
    },
  ],
  lines: [
    {
      from: "start",
      to: "end",
      fromPoint: 1,
      toPoint: 0,
    },
  ],
});

editor.schema.format();
editor.controller.autoFit();

console.log(editor.schema.getData());
```

### 浏览器脚本方式

```sh
npm install
npm run build:browser
open public/basic.html
```

public/basic.html 会直接加载 dist/MMEditor.browser.js，适合验证全局变量接入链路。

## 核心概念

- MMEditor
  - 顶层实例，负责初始化 DOM、组合 graph、schema、controller、minimap，并暴露 editor 级事件。
- graph
  - 图形层，包含 node、line、anchorLine 三个子模块，负责渲染、交互和图上事件。
- schema
  - 数据层，负责 setData、setInitData、getData、format、undo、redo 和历史管理。
- controller
  - 视口层，负责 autoFit、autoScale、pan、moveTo、zoom、zoomTo、transform。
- 节点与连线注册
  - 通过 graph.node.registeNode 和 graph.line.registeLine 扩展渲染与行为。

## 文档入口

- [文档总览](./docs/README.md)
- [快速开始与初始化](./docs/get-started.md)
- [示例与 demo 导航](./docs/demos.md)
- [二次开发：自定义节点与连线](./docs/custom-shape.md)
- [事件与交互模型](./docs/events.md)
- [能力矩阵与边界](./docs/capabilities.md)
- [从 nebulagraph-veditor 迁移](./docs/migration-from-nebulagraph-veditor.md)
- [AI 能力索引](./docs/ai-capabilities.md)
- [文档迁移与能力刷新实施方案](./docs/mmeditor-docs-migration-plan.md)
- [nebulagraph-veditor 可迁移内容审计](./docs/nebulagraph-veditor-migration-audit.md)

## 示例入口

- npm start
  - 启动 React 编辑台 demo，默认打开 public/dev.html，适合完整体验拖拽建图、自动布局、撤销重做和右键交互。
- public/basic.html
  - 最小浏览器接入示例，展示全局脚本加载、加点、加边。
- public/shape.html
  - 自定义节点示例，展示 registeNode、自定义 render 和 linkPoints。
- public/flowChart.html
  - 流程图布局示例，展示 setData、format、autoScale、autoFit 和 dagreOption。
- public/graph.html
  - 动态图示例，展示 line:beforeadd、自定义节点、forceLine 和 d3-force 联动。

## 典型工作流

1. 创建编辑器实例并挂载容器。
2. 通过 schema.setInitData 或 graph.node.addNode / graph.line.addLine 写入图数据。
3. 通过 schema.format 和 controller.autoFit 完成布局与视口定位。
4. 通过 graph.on 或 editor.on 监听交互事件，接入业务状态。
5. 通过 schema.getData 导出结果，或用 undo / redo 管理历史。

## 集成方式

- 业务应用集成
  - 直接 import MMEditor，按实例方式嵌入已有页面。
- 浏览器脚本集成
  - 构建 dist/MMEditor.browser.js 后，通过 window.MMEditor 使用。
- React 编辑台复用
  - 参考 demo/index.js 的组织方式，把组件面板、属性面板、顶部工具栏和右键菜单接到 editor 实例。

## 二次开发方式

- 自定义节点
  - 用 graph.node.registeNode 注册新 type，并覆写 render、linkPoints、renderLinkPoint。
- 自定义连线
  - 用 graph.line.registeLine 注册新 type，并覆写 render、renderArrow、checkNewLine。
- 数据校验
  - 可为默认连线或自定义连线配置 checkNewLine，阻断非法连接。
- 事件扩展
  - 通过 graph 和 editor 两层事件挂接业务逻辑，不必侵入底层渲染代码。

## 构建与开发

```sh
npm install
npm start
npm run lint
npm test
npm run build
npm run build:browser
npm run makeDts
npm run build:all
```

- 库入口来自 src/index.ts，构建产物默认输出到 dist/MMEditor.js。
- 浏览器版构建产物目标名是 dist/MMEditor.browser.js。
- lint 脚本当前执行 TypeScript 类型检查。
- test 脚本当前执行 build、build:browser、build:demo 和 makeDts 这组构建级冒烟校验。
- package.json 已声明 types 为 ./types/index.d.ts，仓库当前也已生成对应声明文件。
- 正式公开 API 仍以 src/index.ts 导出边界和 README/docs 中已记录的能力为准，不建议依赖未文档化的深层类型路径。
- doc 脚本当前只声明 typedoc 命令，仓库内尚未提供稳定生成物目录。

## 迁移说明

- 项目继承自 nebulagraph-veditor 的编辑器模型，但对外入口、包名和文档结构已切换到 MMEditor。
- 迁移建议、兼容关系和不再承诺的能力，见 [从 nebulagraph-veditor 迁移](./docs/migration-from-nebulagraph-veditor.md)。

## 已知边界

- 已接入并验证的插件能力是 Minimap。
- BrushSelector 目前只有源码文件，未从 src/index.ts 导出，也没有稳定示例入口，不应视为正式公开能力。
- 当前仓库文档优先提供可运行路径与能力索引，未单独交付在线 API 文档站点。

## License

ISC
