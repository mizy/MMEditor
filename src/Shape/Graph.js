import Node from "./Node";
import Line from "./Line";
import Event from "../Utils/Event";
import Animation from "./Animation";
import AchorLine from './AchorLine';
const backSvg = require("../back.svg");
/**
 * @class
 * @extends Event
 */
class Graph extends Event {
	constructor(editor) {
		super();
		this.editor = editor;
		this.node = new Node(this);
		this.line = new Line(this);
		this.achorLine = new AchorLine(this);
		this.node.linkPointsG.before(this.line.lineG);
		this.animation = Animation;

		// 模式：操作、查看模式
		this.mode = editor.config.mode;

		this.listenEvents();
		this.addBack();
	}

	addBack() {
		this.editor.container.select(".mm-editor-back").node.style.backgroundImage = `url(${backSvg})`
	}

	listenEvents() {
		this.on("node:move", ({ node }) => {
			this.line.updateByNode(node);
		});
		this.editor.svg.attr({
			tabindex: "0"
		});
		this.editor.svg.click(e => {
			if (e.target.tagName === "svg") {
				this.fire("paper:click", e);
			}
			this.editor.svg.node.focus();
			this.focus = true;
		});
		this.editor.svg.node.addEventListener("blur", e => {
			this.focus = false;
		});

		// 查看模式不能删除节点、线条；如果存在部分可操作则自己在业务中监听处理相关逻辑
		if (this.mode !== "view") {
			document.addEventListener("keydown", e => {
				if (!this.focus) return;
				if (e.key === "Backspace") {
					const deleteKeys = [];
					for (let key in this.node.actives) {
						// 不触发事件
						this.node.deleteNode(this.node.actives[key], true);
						delete this.node.actives[key];
						deleteKeys.push(key);
					}
					this.line.activeLine && this.line.deleteLine(this.line.activeLine);
					this.fire("delete", { event: e, deleteKeys })
				}
				if (e.keyCode === "C".charCodeAt(0) && (e.metaKey || e.ctrlKey)) {
					this.fire("copy", { event: e })
				}
				if (e.keyCode === "V".charCodeAt(0) && (e.metaKey || e.ctrlKey)) {
					this.fire("paste", { event: e })
				}
				e.preventDefault();
				return false;
			});
		}

		this.on("line:drag", () => {
			this.linkStatus = "lineing";
			for (let key in this.node.nodes) {
				const node = this.node.nodes[key];
				node.linkPoints.forEach(point => {
					point.attr({
						display: "block"
					});
				});
			}
		});
		this.on("line:drop", () => {
			this.linkStatus = "none";
			for (let key in this.node.nodes) {
				const node = this.node.nodes[key];
				node.linkPoints.forEach(point => {
					point.attr({
						display: "none"
					});
				});
			}
		});

	}

	/**
	 * 添加链接点事件
	 */
	addLinkHoverEvent() {
		const linkPoints = this.editor.paper.selectAll(".mm-link-points");
		linkPoints.forEach(point => {
			point.mouseover(this.onLinkPointHover);
			point.mouseout(this.onLinkPointOut);
		});
	}

	onLinkPointHover = ele => {
		this.hoverLinkPoint = ele;
	};
	onLinkPointOut = ele => {
		this.hoverLinkPoint = undefined;
	};

	/**
	 * 关闭线hover事件
	 */
	offLinkHoverEvent() {
		const linkPoints = this.editor.paper.selectAll(".mm-link-points");
		linkPoints.forEach(point => {
			point.unmouseover(this.onLinkPointHover);
			point.unmouseout(this.onLinkPointOut);
		});
		this.hoverLinkPoint = undefined;
	}

	/**
	 * 
	 * @param {*} data 
	 */
	render(data) {
		this.data = data;
		this.node.render(data.nodesMap);
		this.line.render(data.linesMap);
	}

	/**
	 * 
	 */
	clearGraph() {
		this.line.clear();
		this.node.clear();
	}
}
export default Graph;
