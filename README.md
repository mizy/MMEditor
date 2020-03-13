# [MMEditor](https://mizy.github.io/MMEditor/)
* 基于Snap.svg绘图库完成的流程图框架，依赖少，开箱即用，提供dom接口方便对dom进行各种状态操作，demo 提供一个基础的数据流程demo 和 基础的流程项目 设计框架
* flow editor lib with snap.svg
* ![](https://mizy.github.io/MMEditor/snapshot.png)

# Demo

[basic demo](https://mizy.github.io/MMEditor/dist/basic.html)

[flow demo](https://mizy.github.io/MMEditor/dist/index.html)


# Install
```sh
npm i MMEditor --save
```

# Usage
```javascript
	import MMEditor from "mmeditor";
	
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

# registe node

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
		// link point position
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

# Documention

[doc](https://mizy.github.io/MMEditor/doc/index.html)


# Test
``` sh
npm i
npm run start
```

# API

![](https://mizy.github.io/MMEditor/MMEditor.png)
详情见[脑图 API](http://naotu.baidu.com/file/1dd5c0ff16911b44ca80ab25424908d0?token=b0b597b3b04dedb2)
 