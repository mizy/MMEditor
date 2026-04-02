# 示例与 demo 导航

MMEditor 当前同时提供 public 示例页和一个 React 编辑台 demo。本页按推荐阅读顺序组织，而不是按目录平铺。

## 推荐阅读顺序

1. public/basic.html
2. public/shape.html
3. public/flowChart.html
4. public/graph.html
5. npm start 对应的 React 编辑台

## 基础接入

入口：

- [public/basic.html](../public/basic.html)

适用场景：

- 想先确认浏览器脚本接入路径是否可用
- 想看最小 addNode / addLine 用法

启动方式：

```sh
npm run build:browser
open public/basic.html
```

覆盖能力：

- window.MMEditor 全局变量接入
- 创建实例
- graph.node.addNode
- graph.line.addLine
- 默认连线校验覆写

源码阅读重点：

- dist/MMEditor.browser.js
- public/basic.html

## 自定义节点

入口：

- [public/shape.html](../public/shape.html)

适用场景：

- 想了解 registeNode 的最小用法
- 想用自己的 SVG 结构替换默认节点

启动方式：

```sh
npm run build:browser
open public/shape.html
```

覆盖能力：

- graph.node.registeNode
- 自定义 render
- 自定义 linkPoints
- 默认连线 checkNewLine 覆写

源码阅读重点：

- public/shape.html
- src/Shape/Node.ts
- src/Shape/Nodes/DefaultNodes.ts

## 自动布局与数据回填

入口：

- [public/flowChart.html](../public/flowChart.html)

适用场景：

- 想从后端数据一次性渲染流程图
- 想调 dagre 布局方向和间距

启动方式：

```sh
npm run build:browser
open public/flowChart.html
```

覆盖能力：

- schema.setData
- schema.format
- controller.autoScale
- controller.autoFit
- dagreOption.rankdir / ranksep
- polyline 连线类型

源码阅读重点：

- public/flowChart.html
- src/Model/Schema.ts
- src/Utils/Controller.ts

## 动态图与事件联动

入口：

- [public/graph.html](../public/graph.html)

适用场景：

- 想接 d3-force 等外部布局引擎
- 想根据事件动态替换连线类型

启动方式：

```sh
npm run build:browser
open public/graph.html
```

覆盖能力：

- graph.node.registeNode
- graph.on("line:beforeadd")
- forceLine 连线
- Utils.makeLineSort
- graph.update
- 与 d3-force 的运行时联动

源码阅读重点：

- public/graph.html
- src/Shape/Line.ts
- src/Shape/Lines/ForceLine.ts

## React 编辑台

入口：

- npm start
- [demo/index.js](../demo/index.js)

适用场景：

- 想看更接近真实业务后台的集成方式
- 想了解左侧拖拽、中间画布、右侧属性、顶部操作栏怎么接到 MMEditor

启动方式：

```sh
npm install
npm start
```

覆盖能力：

- showMiniMap 小地图
- 自定义节点类型注册
- 默认连线 checkNewLine 校验
- schema.setInitData / format / history.reset
- node:click、node:unactive、paper:click 等事件绑定
- 拖拽创建节点
- 顶部工具栏的撤销、重做、自动布局、自动居中

源码阅读重点：

- demo/index.js
- demo/Content/TopBar.js
- demo/Content/LeftBar.js
- demo/Content/RightBar.js

## 选择建议

- 只想确认能否跑起来
  - 先看 basic.html。
- 只想做自定义节点
  - 先看 shape.html，再看 custom-shape.md。
- 需要流程布局
  - 先看 flowChart.html。
- 需要动态图联动
  - 先看 graph.html。
- 需要完整产品化集成参考
  - 直接启动 npm start。
