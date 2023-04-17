# the repo has been transfer to https://github.com/vesoft-inc/nebulagraph-veditor, a new typescript refact lib!

![](https://mizy.github.io/MMEditor/snapshot.png)
## [MMEditor](https://mizy.github.io/MMEditor)

MMEditor is a library for building flow graphs. You can custom your node's shape easily by registe your own node types with svg and dom.

## Demo

[Editor Demo](https://mizy.github.io/MMEditor/public/)

[Basic Demo](https://mizy.github.io/MMEditor/public/basic.html)

[DAG Flow Chart](https://mizy.github.io/MMEditor/public/flowChart.html)

## Install
```sh
npm i MMEditor --save
```

## Quick Start
```javascript
	import MMEditor from "MMEditor";
	
	let index = 0;
	const editor =  new MMEditor({ dom: document.getElementById("root")});
	// add node
	function add(){
		editor.graph.node.addNode({
			uuid:index,
			type:"default",
			name:"测试"+index++,
			x:window.innerWidth*Math.random(),
			y:300*Math.random()
		})
	}
	for(let x = 0;x<50;x++){
		add();
	}
	// add line
	for(let x = 0;x<10;x++){
		editor.graph.line.addLine({
			from:Math.floor(50*Math.random()),
			to:Math.floor(50*Math.random()),
			fromPoint:1,
			toPoint:0
		})
	}
	// result
	console.log(editor.schema.getData())
```

## Registe Node

```javascript
	import MMEditor from "MMEditor";
	
	let index = 0;
	const editor =  new MMEditor({ dom: document.getElementById("root")});
	// add node
	function add(){
		editor.graph.node.addNode({
			uuid:index,
			type:"file-node",
			name:"测试"+index++,
			x:window.innerWidth*Math.random(),
			y:300*Math.random()
		})
	} 
	// registe file-node
	editor.graph.node.registeNode("file-node", {
		linkPoints: [{ x: 0, y: 0.5 }, { x: 1, y: 0.5 }],
		render: (data, snapPaper) => {
			const node = snapPaper.rect(0, 0, 180, 30);
			const text = snapPaper.text(30, 20, data.name);
			const circle = snapPaper.circle(15, 15, 8).attr({fill: "#39a"});
			node.attr({
				fill: "#fff",
				stroke: "#000",
				rx: 5,
				ry: 5
			});
			return snapPaper.group(node, text, circle);
		}
	});
	add()
	// result data
	console.log(editor.schema.getData())
```

## Document
[中文文档](https://mizy.github.io/MMEditor/doc/index.md)

## Architecture
![](https://mizy.github.io/MMEditor/MMEditor.png)

## API 
[api](https://mizy.github.io/MMEditor/api)

## Develop
```sh
npm run start # develop
npm run build # build library
npm run build:demo # build demo
```

## Test
``` sh
npm i
npm run start
```
 
