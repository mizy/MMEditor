# 二次开发：自定义节点与连线

MMEditor 的扩展入口集中在 graph.node 和 graph.line 两层。本页说明如何基于当前仓库已公开的注册机制做二次开发。

## 核心入口

- graph.node.registeNode(type, config, extend)
  - 注册新节点类型。
- graph.line.registeLine(type, config, extend)
  - 注册新连线类型。

默认可继承的节点类型：

- default
- iconNode
- domNode

默认可继承的连线类型：

- default
- polyline
- forceLine

## 自定义节点

最小示例：

```ts
import MMEditor, { Utils } from "mmeditor";

const { SVGHelper, dom } = Utils;
const editor = new MMEditor({
  dom: document.getElementById("root") as HTMLDivElement,
});

editor.graph.node.registeNode(
  "pixel",
  {
    linkPoints: [
      { x: 0, y: 0.5 },
      { x: 1, y: 0.5 },
      { x: 0.5, y: 0 },
      { x: 0.5, y: 1 },
    ],
    render(instanceNode) {
      if (instanceNode.shape) {
        instanceNode.shape.remove();
      }

      const circle = SVGHelper.circle(30, 30, 30);
      const text = SVGHelper.text(12, 35, instanceNode.data.name || "");

      dom.setAttrs(circle, {
        fill: "#ffffff",
        stroke: "#222222",
      });

      return SVGHelper.group(circle, text);
    },
  },
  "default"
);

editor.graph.node.addNode({
  uuid: "pixel-1",
  type: "pixel",
  name: "Pixel",
  x: 80,
  y: 80,
});
```

说明：

- 第三个参数 extend 用来指定继承自哪个已有节点类型。
- render 负责返回节点的 SVG 结构；节点重渲染时应先移除旧 shape，再重新创建新的 SVG 元素。
- linkPoints 用来定义锚点相对位置。

## 自定义 link point 渲染

如果默认锚点渲染不满足需求，可以继续覆写 renderLinkPoint。

graph.html 中的 circle-node 示例就是这种方式，关键点是：

- 根据节点 bbox 计算锚点的绝对坐标。
- 自行创建 point.dom。
- 把 point.x 和 point.y 写回实例，供连线模块使用。

适用场景：

- 圆形节点
- 不规则节点
- 需要隐藏默认锚点但保留可连线能力

## 自定义连线

最小示例：

```ts
import MMEditor from "mmeditor";

const editor = new MMEditor({
  dom: document.getElementById("root") as HTMLDivElement,
});

editor.graph.line.registeLine(
  "always-pass",
  {
    checkNewLine(lineData) {
      return lineData.from !== lineData.to;
    },
  },
  "default"
);

editor.graph.line.addLine({
  type: "always-pass",
  from: "node-a",
  to: "node-b",
  fromPoint: 1,
  toPoint: 0,
});
```

说明：

- 可只覆写 checkNewLine，复用默认渲染。
- 如果要改变线型、箭头或标签，可以继续覆写 render、renderArrow、renderLabel。

## 连接校验

最常用的扩展点是 checkNewLine。

常见用法有两类：

- 挂到默认连线上

```ts
editor.graph.line.shapes["default"].checkNewLine = (lineData) => {
  return lineData.from !== lineData.to;
};
```

- 挂到自定义连线上

```ts
editor.graph.line.registeLine(
  "guarded-line",
  {
    checkNewLine(lineData, editor) {
      const { from, to } = lineData;
      return from !== to && !!editor.graph.node.nodes[from] && !!editor.graph.node.nodes[to];
    },
  },
  "default"
);
```

demo/index.js 中还展示了一个更接近业务场景的版本：

- 禁止自己连自己
- 检查父节点链，避免形成环

## 自定义类型推荐流程

1. 先挑一个最接近的内置类型做继承基类。
2. 只改必要的 render 或 checkNewLine。
3. 在 public 示例页或 demo 中先跑通。
4. 再把业务字段收敛到 node.data 或 line.data。

## 相关源码

- [src/Shape/Node.ts](../src/Shape/Node.ts)
- [src/Shape/Line.ts](../src/Shape/Line.ts)
- [src/Shape/Nodes/DefaultNodes.ts](../src/Shape/Nodes/DefaultNodes.ts)
- [src/Shape/Lines/Line.ts](../src/Shape/Lines/Line.ts)
- [public/shape.html](../public/shape.html)
- [public/graph.html](../public/graph.html)
- [demo/index.js](../demo/index.js)

## 常见问题

- 问：registeNode 和 registeLine 为什么沿用 registe 这个命名？
  - 这是当前仓库的既有公开 API，文档保持与现状一致，不额外重命名。

- 问：BrushSelector 能否作为扩展入口直接使用？
  - 当前不能。仓库里只有源码文件，未从主入口导出，也没有稳定示例。
