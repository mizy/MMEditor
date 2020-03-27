import History from "./History";
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

	listenEvents() {
		const historyChangeEvents = ["node:change", "node:add", "node:remove", "line:change", "line:add", "line:remove", "delete"]
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
		this.editor.clearGraph();
		this.renderData(data);
		this.editor.fire("load", data);
	}

	/**
	 * @param  {} data
	 */
	setInitData(data) {
		this.parseData(data); // 解析数据
		this.editor.clearGraph();
		this.renderData(data);
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
			linesMap[`${from}.${fromPoint}=>${to}.${toPoint}`] = item;
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
		this.editor.clearGraph();
		this.history.redo();
		this.renderData(this.data);
		this.editor.fire("redo");
	}

	/**
	 * 撤销
	 */
	undo() {
		this.editor.clearGraph();
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