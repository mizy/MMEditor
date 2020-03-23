import Node from "./Node";
import Line from "./Line";
import Event from "../Utils/Event";
import Animation from "./Animation";
import AchorLine from './AchorLine';
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
		this.listenEvents();
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
		document.addEventListener("keyup", e => {
			if (this.focus && e.key === "Backspace") {
				this.node.activeNode && this.node.deleteNode(this.node.activeNode);
				this.line.activeLine && this.line.deleteLine(this.line.activeLine);
			}
		});
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
