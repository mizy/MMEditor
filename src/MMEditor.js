import Graph from "./Shape/Graph";
import Snap, { eve, mina } from "./Snap/snap.svg.js";
import Event from "./Utils/Event";
import Controller from "./Utils/Controller";
import Schema from "./Model/Schema";
import Minimap from './Plugins/Minimap';
import "./index.less";

/**
 * @module MMEditor 默认导出模块
 */
/**
 * @class 
 * @extends Event
 */
class MMEditor extends Event {
	/**
	 * @param {Object} [config]
	 * @param {boolean} config.hideAchor=false  
	 * @param {boolean} config.hideAchorLine=false  
	 * @param {boolean} config.showBackGrid=true  是否展示背景网格
	 * @param {boolean} config.showMiniMap=false 是否展示小地图
	 */
	constructor(config) {
		super();
		this.config = Object.assign({
			hideAchor: false,
			hideAchorLine: false,
			anchorDistance: 5,
			showBackGrid: true,
			showMiniMap: false,
			mode:undefined,
		}, config);
		if (!config.dom) return;
		this.dom = this.initDom(config.dom);
		this.svg = Snap(this.dom.select("svg"));
		this.paper = this.svg.g();
		this.paper.addClass("mm-editor-paper");
		this.container = this.dom.select(".mm-editor");
		this.resize();
		this.graph = new Graph(this);
		this.controller = new Controller(this);
		this.schema = new Schema(this);
		if (this.config.showMiniMap) {
			this.minimap = new Minimap(this);
			this.minimap.init();
		}
	}

	initDom(dom) {
		dom.innerHTML = `<div class="mm-editor" >
				<div class="mm-editor-back" ></div>
				<div class="mm-editor-svg" >
					<svg  />
				</div>
			</div>`;
		return Snap(dom);
	}

	/**
	 * 重新布局
	 */
	resize() {
		const { width, height } = this.config;
		this.svg.attr({
			width: width || "100%",
			height: height || "100%"
		});
	}

	/**
	 * 销毁函数
	 */
	destroy() {
		this.clearGraph();
		this.graph.clear();
		this.graph = null;
		this.clear();
		this.svg.remove();
		this.dom.innerHTML = null;
		this.controller.clear();
		this.controller = null;
		this.schema = null;
	}

	/**
	 * 重绘 
	 */
	repaint() {
		this.clearGraph();
		this.graph.render(this.schema.data);
	}

	/**
	 * 清空画布
	 */
	clearGraph() {
		this.graph.line.clear();
		this.graph.node.clear();
	}
}
MMEditor.Event = Event;
MMEditor.Schema = Schema;
MMEditor.Snap = Snap;
MMEditor.Graph = Graph;
MMEditor.Controller = Controller;
export default MMEditor;
export { Event, MMEditor, Schema, Snap, Graph, Controller, eve, mina };
