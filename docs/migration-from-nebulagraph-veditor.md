# 从 nebulagraph-veditor 迁移

MMEditor 继承了参考仓库的大部分编辑器模型，但对外入口、包名和文档结构已经切换。本页给出现阶段的迁移要点。

## 一句话说明

如果你来自 nebulagraph-veditor，可以继续沿用“实例 -> graph / schema / controller -> 自定义节点与连线”的理解方式，但要切换到 MMEditor 的包名、文档入口和能力边界。

## 主要变化

- 包名变化
  - 从旧包名迁移为 mmeditor。
- 文档入口变化
  - 不再依赖旧仓库 README 和外链，统一以当前仓库 README 和 docs 目录为准。
- 示例入口变化
  - 当前仓库示例入口由 public/basic.html、shape.html、flowChart.html、graph.html 和 npm start 组成。
- 品牌变化
  - 对外名称统一为 MMEditor。

## 可延续的认知模型

以下思路仍可直接沿用：

- 创建 MMEditor 实例并挂载 DOM。
- 通过 schema.setData 或 setInitData 加载图数据。
- 通过 schema.format 做 dagre 布局。
- 通过 controller.autoFit 或 zoom / pan 控制视口。
- 通过 registeNode / registeLine 做二次开发。
- 通过 editor.on / graph.on 监听交互事件。

## 需要重写或重新核对的部分

- Quick Start 示例
  - 当前文档以 MMEditor 实际导出和现有 demo 为准。
- 事件清单
  - 应以当前 src/Shape/Graph.ts、src/Shape/Node.ts、src/Shape/Line.ts、src/Model/Schema.ts 为准，而不是照搬旧仓库事件名。
- 自定义节点与连线示例
  - 应使用当前仓库真实存在的 default、domNode、iconNode、polyline、forceLine。
- 示例导航
  - 不再沿用旧仓库的页面分类命名。

## 明确舍弃的承诺

以下内容不应从旧文档直接平移：

- 旧品牌和旧仓库外链
- 已在线提供 API 文档站点的说法
- React / Vue / Canvas 全量支持等泛化宣传
- BrushSelector 已稳定可用的暗示

## 迁移建议

1. 先把接入方式切换为 mmeditor。
2. 再按 [快速开始与初始化](./get-started.md) 重跑一次最小示例。
3. 用 [示例与 demo 导航](./demos.md) 重新选择对应场景的示例。
4. 对照 [能力矩阵与边界](./capabilities.md) 检查自己依赖的能力是否已公开。
5. 如果以前使用了旧文档中的扩展示例，按 [二次开发：自定义节点与连线](./custom-shape.md) 重新适配。

## 常见问题

- 问：原来的扩展思路还成立吗？
  - 大体成立。graph、schema、controller 分层和自定义节点/连线思路仍然一致。

- 问：原来的文档链接还能作为真相来源吗？
  - 不能。当前应以 MMEditor 仓库内文档和源码为准。

- 问：BrushSelector 为什么不在迁移后文档里继续宣传？
  - 因为当前仓库没有把它纳入稳定公开入口，继续宣传会扩大文档与代码之间的断层。
