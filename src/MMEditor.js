import Graph from "./Shape/Graph";
import Snap, { eve, mina } from "./Snap/snap.svg.js";
import Event from "./Utils/Event";
import Controller from "./Utils/Controller";
import Schema from "./Model/Schema";
import Minimap from './Plugins/Minimap';
import Util from './Utils/util'
import "./index.less";

/**
 * @class 
 * @extends Event
 */
class MMEditor extends Event {
	constructor(config) {
		super();
		this.config = Object.assign({
			hideAchor: false,
			hideAchorLine: false,
			anchorDistance: 5,
			showBackGrid: true,
			showMiniMap: false,
			mode:undefined,
			dagreOption:{}
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
		dom.innerHTML = `<div class="mm-editor ${this.config.mode||''}" >
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
		this.minimap&&this.minimap.destroy();
		this.graph.destroy();
		this.graph = undefined;
		this.svg.remove();
		this.dom.innerHTML = undefined;
		this.controller.clear();
		this.controller = undefined;
		this.schema = undefined;
		this.clear();
	}

	/**
	 * 重绘 
	 */
	repaint() {
		this.graph.clearGraph();
		this.graph.render(this.schema.data);
	}

}
MMEditor.Event = Event;
MMEditor.Schema = Schema;
MMEditor.Snap = Snap;
MMEditor.Graph = Graph;
MMEditor.Controller = Controller;
MMEditor.Util = Util;
export default MMEditor;
export { Event, MMEditor, Schema, Snap, Graph, Controller, eve, mina };
