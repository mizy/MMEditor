import History from "./History";
import dagre from 'dagre'; 
/**
 * @class
 */
class Schema {
	constructor(editor) {
		this.data = {
			nodesMap: [],
			linesMap: []
		}
		this.editor = editor;
		/**
		 * @property history
		 */
		this.history = new History(this);
		this.listenEvents();
	}

	format(){
		const nodes = this.editor.graph.node.nodes;
		const lines = this.editor.graph.line.lines;
		const res = {
			nodes:[],
			lines:[]
		}
		const g = new dagre.graphlib.Graph();
		const option = Object.assign({
			nodesep: 50,
			rankdir: 'TB',
			ranksep:50,
			align: 'UL'
		},this.editor.config.dagreOption)
		g.setGraph(option);
		const {center=true} = this.editor.config.dagreOption;

		g.setDefaultEdgeLabel(function() {
			return {};
		});

		for(let key in nodes){
			const node = nodes[key];
			const data = node.data;
			if(!data.width||!data.height){
				const bbox = node.getBBox();
				data.width = bbox.width;
				data.height = bbox.height;
			}
			g.setNode(key, {...data});
		}
		for(let key in lines){
			const line = lines[key];
			const data = line.data;
			g.setEdge(data.from, data.to);
			res.lines.push(data)
		} 
		
		dagre.layout(g);

		g.nodes().forEach(function(key) {
			const nodeData = g.node(key);
			if(center){
				if(option.rankdir.indexOf('T')<0){// 左右布局
					nodeData.y -= nodeData.height/2;
				}else{//上下布局
					nodeData.x -= nodeData.width/2;
				}
			}
			res.nodes.push(nodeData);
		});
		// 触发format事件，保存历史
		this.setData(res);
		this.editor.fire("format",{data:res})
	}

	listenEvents() {
		const historyChangeEvents = ["node:change", "node:add", "node:remove", "line:change", "line:add", "line:remove", "delete","autofit"]
		historyChangeEvents.forEach(event => {
			this.editor.graph.on(
				event,
				() => {
					this.history.push(this.getNowDataMap());
				},
				9999
			);
		});
	}

	pushHistory(){
		this.history.push(this.getNowDataMap());
	}

	popHistory(){
		this.history.pop();
	}

	getNowDataMap() {
		const nodes = this.editor.graph.node.nodes;
		const lines = this.editor.graph.line.lines;
		let nodesMap = {};
		let linesMap = {};
		for (let uuid in nodes) {
			nodesMap[uuid] = nodes[uuid].data;
		}
		for (let uuid in lines) {
			linesMap[uuid] = lines[uuid].data;
		}
		this.data = {
			nodesMap,
			linesMap
		};
		return this.data;
	}


	/**
	 * @param  {} data
	 */
	setData(data) {
		this.parseData(data); // 解析数据
		this.editor.graph.clearGraph();
		this.renderData(data);
		this.editor.fire("load", data);
	}

	/**
	 * @param  {} data
	 */
	setInitData(data) {
		this.setData(data);
		this.history.clear();
		this.history.push(this.data);
	}

	/**
	 * 解析数据
	 * @param {array} data
	 */
	parseData({ nodes = [], lines = [] }) {
		let nodesMap = {};
		let linesMap = {};
		nodes.forEach(item => {
			item.x = parseInt(item.x, 10);
			item.y = parseInt(item.y, 10);
			nodesMap[item.uuid] = item;
		});
		lines.forEach(item => {
			const { from, to, fromPoint = 0, toPoint = 0 } = item;
			linesMap[`${from}.${fromPoint}=${to}.${toPoint}`] = item;
		});
		this.data = {
			nodesMap,
			linesMap
		};
	}

	/**
	 * 渲染数据
	 */
	renderData() {
		this.editor.graph.render(this.data);
	}

	/**
	 * 重做
	 */
	redo() {
		this.editor.graph.clearGraph();
		this.history.redo();
		this.renderData(this.data);
		this.editor.fire("redo");
	}

	/**
	 * 撤销
	 */
	undo() {
		this.editor.graph.clearGraph();
		this.history.undo();
		this.renderData(this.data);
		this.editor.fire("undo");
	}

	/**
	 * 获取数据
	 */
	getData() {
		const { nodesMap, linesMap } = this.data;

		return {
			nodes: Object.keys(nodesMap).map(key => nodesMap[key]),
			lines: Object.keys(linesMap).map(key => linesMap[key])
		};
	}
}
export default Schema;