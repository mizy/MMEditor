# 快速开始与初始化

本页提供最短路径，帮助你在当前仓库里完成一次可运行的 MMEditor 初始化、布局和数据导出。

## 适用读者

- 第一次接入 MMEditor 的开发者
- 需要确认实例 API、初始化顺序和最小数据结构的维护者

## 安装

```sh
npm install mmeditor
```

如果你在当前仓库本地验证示例，先执行：

```sh
npm install
```

## 最小初始化

```ts
import MMEditor from "mmeditor";

async function bootstrap() {
  const root = document.getElementById("root") as HTMLDivElement;

  const editor = new MMEditor({
    dom: root,
    showBackGrid: true,
    showMiniMap: true,
  });

  await editor.schema.setInitData({
    nodes: [
      {
        uuid: "source",
        type: "default",
        name: "Source",
        x: 0,
        y: 0,
      },
      {
        uuid: "target",
        type: "default",
        name: "Target",
        x: 240,
        y: 120,
      },
    ],
    lines: [
      {
        from: "source",
        to: "target",
        fromPoint: 1,
        toPoint: 0,
      },
    ],
  });

  editor.schema.format();
  editor.controller.autoFit();

  return editor;
}

bootstrap();
```

## 浏览器脚本方式

如果你希望不经过打包器，直接验证浏览器接入方式：

```sh
npm run build:browser
open public/basic.html
```

public/basic.html 中使用的是：

```js
const { MMEditor } = window.MMEditor;
const editor = new MMEditor({ dom: document.getElementById("demo") });
```

这条路径适合验证 dist/MMEditor.browser.js 是否可被页面直接消费。

## 初始化顺序

推荐顺序如下：

1. 创建 MMEditor 实例。
2. 设置初始数据。
3. 执行自动布局。
4. 调整视口。
5. 绑定事件。

对应 API 一般是：

- new MMEditor(...)
- editor.schema.setInitData(data)
- editor.schema.format()
- editor.controller.autoFit()
- editor.graph.on(...) 或 editor.on(...)

## 数据模型

MMEditor 对外使用的基础数据结构是：

```ts
type MMEditorData = {
  nodes: MMEditorNode[];
  lines: MMEditorLine[];
};
```

节点最常用字段：

- uuid
  - 节点唯一标识。未传时，addNode 会自动生成并触发 node:makeuuid。
- type
  - 节点类型，默认可用 default、iconNode、domNode，也可以通过 registeNode 扩展。
- x / y
  - 节点坐标。
- name
  - 节点显示名。
- width / height
  - 布局和自定义渲染常用字段。
- data / className / style
  - 业务扩展数据和样式扩展位。

连线最常用字段：

- uuid
  - 连线唯一标识。未传时会生成。
- from / to
  - 起点节点和终点节点 uuid。
- fromPoint / toPoint
  - 起点和终点锚点索引。
- type
  - 连线类型，默认可用 default、polyline、forceLine，也可以通过 registeLine 扩展。
- label / graphIndex / className / data
  - 标签、同向多边排序、样式扩展和业务扩展字段。

## 常见初始化 API

- schema.setData(data)
  - 覆盖当前图数据并重新渲染。
- schema.setInitData(data)
  - 适合首屏加载，会清空历史并把当前数据作为初始状态。
- schema.getData()
  - 导出 nodes 和 lines 数组。
- schema.format()
  - 使用 dagre 对当前图做自动布局。
- schema.undo() / schema.redo()
  - 撤销和重做。

## 常见视口 API

- controller.autoFit(center = true, vertical = true)
  - 把当前图放到合适位置。
- controller.autoScale(padding = 40)
  - 根据内容和容器尺寸计算缩放比。
- controller.pan(x, y)
  - 相对平移。
- controller.moveTo(x, y)
  - 绝对移动到指定位置。
- controller.zoom(scale, cx, cy)
  - 按当前比例继续缩放。
- controller.zoomTo(scale)
  - 直接设置缩放值。
- controller.transform(scale, x, y)
  - 同时设置缩放和平移。

## Demo 入口

- public/basic.html
  - 验证基础浏览器接入。
- public/flowChart.html
  - 验证 setData、format、autoScale、autoFit。
- npm start
  - 打开完整 React 编辑台。

## 常见问题

- 问：为什么推荐用 setInitData 而不是先 setData 再手动清历史？
  - 因为 setInitData 已经封装了首屏加载后的历史重置逻辑，更适合作为初始化入口。

- 问：为什么 format 后还要 autoFit？
  - format 只负责计算节点位置，不负责把内容移动到当前容器的最佳视口位置。

- 问：浏览器示例为什么找不到 MMEditor.browser.js？
  - 先执行 npm run build:browser，确保 dist 目录存在浏览器版构建产物。
