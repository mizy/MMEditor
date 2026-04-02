# 事件与交互模型

MMEditor 当前的事件主要分为 editor 层和 graph 层。一般原则是：

- editor 层关注加载、布局、视口和历史。
- graph 层关注节点、连线、画布和键盘交互。

## editor 层事件

这些事件通过 editor.on 监听。

- load
  - schema.setData 或 setInitData 完成渲染后触发。
- format
  - schema.format 完成后触发。
- autofit
  - controller.autoFit 完成后触发。
- undo
  - schema.undo 完成后触发。
- redo
  - schema.redo 完成后触发。
- zoom
  - controller.zoom 或 transform 触发。controller.zoom 会传入当前调用的缩放倍率；transform 只触发事件，不附带 payload。
- panning
  - controller.pan、transform 或鼠标拖动画布时触发。
- panEnd
  - 鼠标停止拖动画布时触发。
- node:makeuuid
  - graph.node.addNode 且未传 uuid 时触发，可用于接管节点 id 生成策略。

最小示例：

```ts
editor.on("load", (data) => {
  console.log("loaded", data);
});

editor.on("format", ({ data }) => {
  console.log("formatted", data);
});

editor.on("zoom", (payload) => {
  console.log("zoom", payload?.scale, editor.controller.scale);
});
```

## graph 层事件

这些事件通过 editor.graph.on 监听。

### 画布与渲染

- beforeRender
  - graph.render 开始前触发。
- render
  - graph.render 完成后触发。
- update
  - graph.update 完成后触发。
- paper:click
  - 点击空白画布时触发。

### 节点

- node:active
  - 节点被选中后触发。
- node:click
  - 点击节点时触发。
- node:change
  - 新增节点或节点发生变化时触发。
- node:startmove
  - 开始拖动节点时触发。
- node:move
  - 拖动节点时触发，常用于联动更新连线。
- node:endmove
  - 拖动结束时触发。
- node:remove
  - 删除节点时触发。
- node:unactive
  - 节点取消选中时触发。

### 连线

- line:beforeadd
  - 新连线真正创建前触发，适合改写 type 或补默认字段。
- line:add
  - 连线创建后触发。
- line:change
  - 连线变化时触发。
- line:remove
  - 连线删除后触发。
- line:click
  - 点击连线时触发。
- line:drag
  - 开始拖拽连线时触发。
- line:drop
  - 连线拖拽结束时触发。

### 键盘与编辑行为

- delete
  - 按 Backspace 删除选中节点或连线后触发。
- copy
  - Cmd/Ctrl + C 时触发。
- paste
  - Cmd/Ctrl + V 时触发。

## 常见监听方式

选择节点并同步右侧面板：

```ts
editor.graph.on("node:click", ({ node }) => {
  console.log("active node", node.data);
});

editor.graph.on("node:unactive", () => {
  console.log("clear active node");
});
```

在创建连线前替换线型：

```ts
editor.graph.on("line:beforeadd", ({ data }) => {
  data.type = "forceLine";
});
```

在布局或拖动后同步外部状态：

```ts
editor.on("format", () => {
  save(editor.schema.getData());
});

editor.on("panning", () => {
  updateViewport(editor.controller.scale);
});
```

## 触发时机建议

- 需要读图数据
  - 优先监听 load、format、line:add、line:remove、delete。
- 需要读选中状态
  - 优先监听 node:click、node:unactive、line:click、paper:click。
- 需要做视口联动
  - 优先监听 zoom、panning、autofit。
- 需要改写默认创建行为
  - 优先监听 line:beforeadd。

## 注意事项

- graph 的删除、复制、粘贴快捷键依赖 document keydown 监听。
- 当 mode 为 view 时，Graph.onKeyDown 会直接返回，默认不执行删除等编辑动作。
- schema 的历史入栈主要依赖 node:change、line:change、line:add、line:remove、delete、autofit、format 等事件链路。Schema.ts 中还保留了对 node:add 的监听配置，但当前稳定对外文档不把它作为已确认事件承诺。

## 相关源码

- [src/MMEditor.ts](../src/MMEditor.ts)
- [src/Shape/Graph.ts](../src/Shape/Graph.ts)
- [src/Shape/Node.ts](../src/Shape/Node.ts)
- [src/Shape/Line.ts](../src/Shape/Line.ts)
- [src/Model/Schema.ts](../src/Model/Schema.ts)
- [src/Utils/Controller.ts](../src/Utils/Controller.ts)
