# flow chart editor

![](https://raw.githubusercontent.com/mizy/MMEditor/master/snapshot.png)

# demo

```
npm i
npm run start
```

# api

![](https://raw.githubusercontent.com/mizy/MMEditor/master/MMEditor.png)
详情见[脑图 API](http://naotu.baidu.com/file/1dd5c0ff16911b44ca80ab25424908d0?token=b0b597b3b04dedb2)
 
# start
```javascript
	let index = 0;
	const editor =  new MMEditor({ dom: document.getElementById("root")});
	// 添加节点
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
	// 添加线
	for(let x = 0;x<10;x++){
		editor.graph.line.addLine({
			from:Math.floor(50*Math.random()),
			to:Math.floor(50*Math.random()),
			fromPoint:1,
			toPoint:0
		})
	}
	// 结果数据
	console.log(editor.schema.getData())
```