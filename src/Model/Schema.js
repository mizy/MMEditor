import History from "./History";
export default class Schema {
	constructor(editor) {
		this.editor = editor;
		this.history = new History(this);
		this.listenEvents();
	}

	listenEvents() {
		// 节点移动了
		this.editor.graph.on(
			"node:change",
			({ node }) => {
				this.data.nodesMap[node.data.uuid] = node.data;
				this.history.push(this.data);
			},
			9999
		);
		this.editor.graph.on(
			"node:add",
			({ node }) => {
				this.data.nodesMap[node.data.uuid] = node.data;
				this.history.push(this.data);
			},
			9999
		);
		this.editor.graph.on(
			"node:remove",
			({ uuid }) => {
				delete this.data.nodesMap[uuid];
				this.history.push(this.data);
			},
			9999
		);
		// 线移动了
		this.editor.graph.on(
			"line:change",
			({ line }) => {
				this.data.linesMap[line.data.uuid] = line.data;
				this.history.push(this.data);
			},
			9999
		);
		this.editor.graph.on(
			"line:add",
			({ line }) => {
				this.data.linesMap[line.data.uuid] = line.data;
				this.history.push(this.data);
			},
			9999
		);
		this.editor.graph.on(
			"line:remove",
			({ uuid }) => {
				delete this.data.linesMap[uuid];
				this.history.push(this.data);
			},
			9999
		);
	}

	/**
	 * 重新设置shema
	 */
	setData(data) {
		this.parseData(data); // 解析数据
		this.editor.clearGraph();
		this.renderData(data);
		this.editor.fire("load", data);
	}

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

	redo() {
		this.editor.clearGraph();
		this.history.redo();
		this.editor.fire("redo");
		this.renderData(this.data);
	}

	undo() {
		this.editor.clearGraph();
		this.history.undo();
		this.editor.fire("undo");
		this.renderData(this.data);
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
