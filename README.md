# mmeditor

基于 [nebulagraph-veditor](https://github.com/vesoft-inc/nebula-VEditor) 的 TypeScript 重写版 SVG 流程图编辑器。

## Install

```sh
npm install mmeditor
```

## Quick Start

```typescript
import VEditor from "mmeditor";

const editor = new VEditor({ dom: document.getElementById("root") });

// add node
editor.graph.node.addNode({
  uuid: "node1",
  type: "default",
  name: "Node 1",
  x: 100,
  y: 100,
});

// get data
console.log(editor.schema.getData());
```

## Features

- SVG flow graph editor
- Custom node shapes (SVG & DOM)
- Built-in plugins: Minimap, BrushSelector
- TypeScript with full type definitions
- dagre auto-layout support

## Develop

```sh
npm install
npm start        # dev server
npm run build    # build library
npm run build:all # build everything
```

## License

ISC
