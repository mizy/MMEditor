# AI 能力索引

本页给自动化流程、脚本生成和 AI 辅助使用，目标是提供一个稳定、可核对的能力索引，减少生成内容偏离仓库现状。

## 包定位

- 包名：mmeditor
- 运行核心：SVG 图编辑器
- 典型使用方式：new MMEditor({ dom }) 后，通过 graph、schema、controller 操作实例

## 公开导出

- 默认导出：MMEditor
- 命名导出：MMEditor、Utils、Node、Line、Schema、DefaultLine、DefaultNode、Graph、History、AnchorLine、Controller、Minimap、Event

## 实例分层

- editor
  - 顶层实例，管理 DOM、graph、schema、controller、minimap
- graph
  - 图形层，管理 node、line、anchorLine 和图上事件
- schema
  - 数据层，管理 setData、setInitData、getData、format、undo、redo
- controller
  - 视口层，管理缩放、平移、自适应

## 已验证稳定能力

- 创建编辑器实例
- 导入与导出 nodes / lines 数据
- dagre 自动布局
- 节点与连线增删改
- 事件监听
- 小地图
- React 编辑台 demo
- 浏览器脚本示例

## 生成示例时推荐引用的 API

- new MMEditor({ dom, showMiniMap, showBackGrid, mode, dagreOption })
- editor.schema.setInitData(data)
- editor.schema.setData(data)
- editor.schema.getData()
- editor.schema.format()
- editor.schema.undo()
- editor.schema.redo()
- editor.controller.autoFit()
- editor.controller.autoScale()
- editor.graph.node.addNode(data)
- editor.graph.line.addLine(data)
- editor.graph.node.registeNode(type, config, extend)
- editor.graph.line.registeLine(type, config, extend)
- editor.on(eventName, handler)
- editor.graph.on(eventName, handler)

## 未公开或应避免生成的内容

- 直接从包入口 import BrushSelector
- 假定可以把所有深层 d.ts 路径都当作正式公共入口
- 假定存在可访问的 typedoc 站点
- 假定支持 Vue、Canvas 或其他未示例化的渲染体系

## 推荐源码入口

- [src/index.ts](../src/index.ts)
- [src/MMEditor.ts](../src/MMEditor.ts)
- [src/Model/Schema.ts](../src/Model/Schema.ts)
- [src/Utils/Controller.ts](../src/Utils/Controller.ts)
- [src/Shape/Graph.ts](../src/Shape/Graph.ts)
- [src/Shape/Node.ts](../src/Shape/Node.ts)
- [src/Shape/Line.ts](../src/Shape/Line.ts)
- [demo/index.js](../demo/index.js)
- [public/basic.html](../public/basic.html)

## 生成约束

- 示例必须使用当前真实存在的导出名。
- 事件名必须来自当前源码。
- 对未导出的插件要明确标注“未公开”或“待交付”。
- 类型声明当前已生成，但推荐只使用包主入口及 README/docs 已记录的 API，不鼓励依赖未文档化的深层路径。
- 若要推荐入口，优先推荐 README、get-started.md、demos.md，而不是假想的 API 站点。
