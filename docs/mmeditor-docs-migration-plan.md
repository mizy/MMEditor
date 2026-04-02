# MMEditor 文档迁移与能力刷新实施方案

## 1. 现状

- 当前仓库只有根目录 README.md，缺少正式 docs 文档体系。
- README 仅覆盖安装、最小初始化、特性和开发命令，不能支撑能力发现、示例导航和二次开发。
- 仓库已具备可复用素材：
  - README 现有骨架可继续作为总览入口。
  - public/basic.html、shape.html、flowChart.html、graph.html 可直接映射为基础示例章节。
  - demo 目录可作为高级示例和操作说明素材。
  - src/index.ts 已形成较稳定的公开导出边界。
- 已知断点集中在四类：
  - 文档结构缺失：无主题文档、无导航页、无迁移说明。
  - 能力说明缺失：事件、数据模型、扩展机制、构建产物均未成体系。
  - 示例说明缺失：demo 与 public 多入口并存，但没有统一说明。
  - 能力状态不透明：Minimap 可用、BrushSelector 未导出，这类差异未被标注。

## 2. 问题

### 高优先级

- README 承担了过多职责，但信息密度不足，导致首次接入路径不清晰。
- 文档没有按“接入、核心能力、扩展、迁移、示例”分层，新成员难以快速定位信息。
- 仓库能力与文档承诺不一致，尤其是类型产物、插件能力和浏览器入口说明存在断层。

### 中优先级

- demo 与 public 示例分散，缺少统一命名和阅读顺序，示例价值无法被充分复用。
- 缺少面向 AI/自动化消费的能力文档，后续难以稳定支撑 agent、skill 或生成式辅助流程。

### 低优先级

- Typedoc 脚本存在但未形成稳定交付物，短期不适合承诺为正式 API 站点。

## 3. 方案

### 3.1 目标信息架构

- 根入口保持 README，职责收敛为：
  - 项目定位
  - 安装
  - 最小可运行 Quick Start
  - 文档导航
  - 示例入口
  - 构建与开发说明
  - 能力边界与迁移提示
- docs 目录作为正式文档主容器，首批规划为：
  - docs/README.md：文档总览与阅读路径
  - docs/get-started.md：安装、初始化、setInitData、format、autoFit、getData
  - docs/demos.md：示例索引，统一说明 demo 与 public 的关系
  - docs/custom-shape.md：registeNode、registeLine、自定义渲染、连线校验
  - docs/events.md：editor / graph / node-line 事件分层
  - docs/capabilities.md：能力矩阵与成熟度说明
  - docs/migration-from-nebulagraph-veditor.md：兼容与差异说明
  - docs/ai-capabilities.md：AI skill / capability 消费文档
- API 参考暂不单独承诺站点，先通过 docs/capabilities.md 承接“公开导出 + 状态说明 + 后续 typedoc 衔接点”。

### 3.2 README 改造范围

- 保留现有 Install、Quick Start、Develop 基本骨架。
- 新增 Documents 小节，链接 docs/README.md、迁移审计、实施方案。
- 新增 Demos 小节，明确：
  - npm start 对应 React 编辑台
  - public/basic.html 对应基础接入
  - public/shape.html 对应自定义节点
  - public/flowChart.html 对应流程图布局
  - public/graph.html 对应动态图与事件
- 新增 Capability Notes 小节，明确：
  - 当前已验证能力
  - BrushSelector 尚未纳入公开入口
  - types 与 typedoc 当前属于待补齐交付项
- 新增 Migration 小节，指向迁移说明文档。

### 3.3 demo 说明结构

- docs/demos.md 按“推荐阅读顺序”组织，不按文件目录平铺：
  1. 基础接入：basic.html
  2. 自定义节点：shape.html
  3. 自动布局与数据回填：flowChart.html
  4. 动态图与事件联动：graph.html
  5. 高级编辑台：demo/index.js
- 每个示例统一写四段信息：
  - 适用场景
  - 启动方式
  - 覆盖能力
  - 阅读源码入口

### 3.4 AI skill / capability 文档结构

- 新增 docs/ai-capabilities.md，面向 agent、skill 和自动化生成流程，内容限定为稳定事实：
  - 包定位与运行模式
  - 公开导出清单
  - 实例核心分层：MMEditor、graph、schema、controller
  - 已验证能力列表
  - 未公开或未完成能力列表
  - 推荐引用源码入口
  - 生成示例时必须遵守的边界
- 该文档不重复教程，而是提供“机器可消费的能力索引”，减少后续 AI 输出失真。

### 3.5 迁移边界

- 本轮只迁移并重组文档与示例说明，不修改运行时代码导出边界。
- 不在本轮承诺：
  - 在线 API 站点
  - 完整 typedoc 产物
  - BrushSelector 对外开放
  - Vue / Canvas 等未验证能力
- 对 README 中“full type definitions”类表述改为“TypeScript 重写，类型产物待仓库交付校验”，避免继续放大断层。

### 3.6 验证方式

- 结构验证：
  - README 与 docs/README.md 的链接可达
  - docs 内文档路径一致，无悬空引用
- 能力验证：
  - 所有文档示例仅引用当前仓库真实存在的入口、导出和页面
  - 能力矩阵必须区分“已验证 / 部分集成 / 未公开”
- 运行验证：
  - npm start 可打开编辑台入口
  - public 示例页命名与文档描述一致
- 一致性验证：
  - README、docs、迁移说明中的包名、产物名、能力边界表述一致

### 3.7 交付顺序

1. P0：README、docs/README.md、docs/get-started.md、docs/migration-from-nebulagraph-veditor.md
2. P1：docs/demos.md、docs/custom-shape.md、docs/events.md、docs/capabilities.md
3. P2：docs/ai-capabilities.md、示例截图与更细粒度 API 参考补充

## 4. 影响评估

- 风险较低：本次以文档重组为主，不触碰运行时代码和构建链路。
- 影响范围集中在 README 与 docs，可直接改善项目首屏可读性和能力可发现性。
- 对未来 2-3 年扩展更有利：
  - docs 分层后可持续追加 API、插件、版本迁移内容。
  - demo 与能力说明解耦，后续新增示例不会继续挤压 README。
  - AI capability 文档独立后，可降低自动生成错误引用和过度承诺风险。
- 对维护性的直接收益：
  - 新成员能按“接入 -> 示例 -> 扩展 -> 迁移”路径快速理解系统。
  - 出现能力争议时，可先在 capabilities 与 migration 文档定位边界，再决定是否改代码或改文档。
