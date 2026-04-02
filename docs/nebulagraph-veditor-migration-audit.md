# nebulagraph-veditor 可迁移内容审计

## 审计结论

nebulagraph-veditor 仍有可复用的文档骨架和示例主题，但不能直接平移。MMEditor 当前代码能力与参考仓库高度同源，仍覆盖基础编辑、节点/连线扩展、事件、历史、自动布局、小地图和 demo 编辑台；同时旧仓库的品牌、包名、部分能力表述和示例命名已经过时，必须按 MMEditor 现状重写。

## 应迁移

- README 的信息架构
  - 保留 Features、Install、Quick Start、Demo、Build、Documents 这一层级。
  - 理由：当前 README 只有基础介绍，缺少 demo 入口、能力边界和进阶文档导航，旧仓库这套结构更完整。

- start.md 的教程主线
  - 保留“安装 -> 创建实例 -> setInitData -> format -> autoFit -> getData”的教学顺序。
  - 理由：该顺序与 MMEditor 当前 API 仍然匹配，src/MMEditor.ts、src/Model/Schema.ts、demo/index.js 都已证明这条链路成立。

- custom.md 的“节点/连线扩展”主题
  - 保留“registeNode / registeLine”的二次开发方向。
  - 理由：src/Shape/Node.ts 和 src/Shape/Line.ts 仍保留注册入口，且默认节点、DomNode、IconNode、DefaultLine、PolyLine、ForceLine 都能支撑新版示例。

- event.md 的“事件地图”主题
  - 保留 editor 层、graph 层、node/line 子事件分层说明。
  - 理由：当前代码仍存在 editor.on / graph.on 两级事件模型，适合整理为事件参考文档。

- demo 的编辑台组织方式
  - 保留 LeftBar / TopBar / RightBar / 右键菜单 / testdata 的演示组合。
  - 理由：当前 demo 目录仍延续同样结构，说明其对展示核心交互仍有价值，可继续作为文档截图和交互说明来源。

## 应重写

- README 的品牌与能力描述
  - 需要把 NebulaGraph veditor、@vesoft-inc/veditor 全部替换为 MMEditor、mmeditor。
  - 需要删除或收敛“sequence diagrams、workflow、React/Vue、Canvas support”等泛化表述，仅保留当前仓库已验证能力。
  - 理由：现有仓库只明确提供 SVG 编辑器和 React demo，过度承诺会导致文档失真。

- Quick Start 示例
  - 需要从“随机加点加边”改写为“最小可运行示例 + setInitData 示例”。
  - 理由：旧 README 示例偏展示性质，start.md 的初始化数据流更适合新用户理解当前 API。

- 自定义节点/线示例代码
  - 需要替换为基于 MMEditor 导出的实际类型和路径，示例优先覆盖 iconNode、domNode、polyline 或 forceLine。
  - 理由：旧文档中引用了 VEditor.Default.Node、VisualQueryLine、旧命名空间，直接复制会误导使用者。

- 事件文档
  - 需要按 MMEditor 当前代码重新核对并生成，而不是照搬旧列表。
  - 理由：旧文档包含 node:add 等与当前实现不完全一致的事件名，且部分事件需要补充触发时机说明。

- Demo 说明
  - 需要从“多页面 demo 链接”重写为“当前仓库单一 React 编辑台 demo 的操作说明”。
  - 理由：MMEditor 当前仓库没有旧仓库 README 中那组 public 页面导航，文档入口形态已经变化。

- 迁移说明
  - 需要新增一节“从 nebulagraph-veditor 到 MMEditor”的兼容与差异说明。
  - 理由：当前 README 只提到“基于 ... 重写版”，但没有说明包名变化、品牌变化、能力继承范围和不再承诺的内容。

## 应舍弃

- 旧品牌资产和外链
  - 包括 NebulaGraph veditor 名称、旧 GitHub Pages 链接、旧 npm 包名、旧仓库链接。
  - 理由：继续保留会让用户落到错误入口。

- “API 文档已在线可用”的表述
  - 理由：当前仓库虽有 typedoc 脚本，但未体现稳定的公开发布入口，不应先写死外链。

- React/Vue/Canvas 全量支持的营销措辞
  - 理由：当前仓库可证实的是 React demo 和 SVG 渲染体系，Vue/Canvas 缺少现成示例与说明。

- 旧 demo 分类
  - 包括 Basic Demo、FlowChart Demo、Force-directed Graph 的旧页面链接名称。
  - 理由：当前仓库 demo 组织已不同，继续沿用会制造“文档有入口但仓库无对应页面”的断层。

## 推荐迁移清单

1. 重写 README
   - 增补 Demo、Documents、二次开发入口和迁移说明。

2. 新增 docs/get-started.md
   - 以 start.md 为底稿，改成 MMEditor 实际包名和当前 API。

3. 新增 docs/custom-shape.md
   - 以 custom.md 为底稿，但示例全部替换成当前仓库真实可运行版本。

4. 新增 docs/events.md
   - 以旧 event.md 为目录模板，按当前源码逐项校正。

5. 新增 docs/migration-from-nebulagraph-veditor.md
   - 说明命名、入口、兼容性和弃用项。

6. 为现有 demo 补一页使用说明
   - 重点介绍拖拽建图、自动布局、撤销重做、导入导出、运行演示和右键交互。

## 优先级建议

- P0：README、get-started、migration
- P1：custom-shape、events
- P2：demo 操作说明与截图更新
