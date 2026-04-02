# MMEditor 文档总览

MMEditor 文档按“接入 -> 示例 -> 扩展 -> 边界 -> 迁移”组织，优先帮助新读者尽快跑通，再帮助开发者理解可扩展点。

## 推荐阅读顺序

1. [README](../README.md)
   - 先了解项目定位、入口方式、最短启动路径和能力边界。
2. [快速开始与初始化](./get-started.md)
   - 了解实例创建、数据写入、自动布局、视口控制和导出数据。
3. [示例与 demo 导航](./demos.md)
   - 选择最接近自己场景的示例入口。
4. [二次开发：自定义节点与连线](./custom-shape.md)
   - 做节点、连线、校验规则和渲染扩展。
5. [事件与交互模型](./events.md)
   - 了解 editor / graph 两层事件以及常见触发时机。
6. [能力矩阵与边界](./capabilities.md)
   - 确认哪些能力已验证、哪些只是部分集成、哪些还未公开。
7. [从 nebulagraph-veditor 迁移](./migration-from-nebulagraph-veditor.md)
   - 处理包名、文档入口、能力承诺和示例入口的迁移。

## 文档目录

- [get-started.md](./get-started.md)
  - 面向首次接入者的最短路径。
- [demos.md](./demos.md)
  - React 编辑台和 public 示例页索引。
- [custom-shape.md](./custom-shape.md)
  - 节点与连线扩展方式。
- [events.md](./events.md)
  - 事件分层、典型监听点和使用建议。
- [capabilities.md](./capabilities.md)
  - 能力矩阵、导出边界、构建产物和成熟度说明。
- [migration-from-nebulagraph-veditor.md](./migration-from-nebulagraph-veditor.md)
  - 从参考仓库迁移到当前仓库的说明。
- [ai-capabilities.md](./ai-capabilities.md)
  - 面向自动化和 AI 流程的稳定能力索引。
- [mmeditor-docs-migration-plan.md](./mmeditor-docs-migration-plan.md)
  - 本轮文档刷新方案。
- [nebulagraph-veditor-migration-audit.md](./nebulagraph-veditor-migration-audit.md)
  - 参考仓库可迁移内容审计。

## 维护约定

- 文档只描述仓库中真实存在的导出、脚本、示例页和构建入口。
- 未公开、未导出或尚无稳定示例的能力，必须显式标注状态。
- README 负责总览，docs 负责结构化说明；后续新增内容优先落到 docs，而不是继续堆叠在根 README。
