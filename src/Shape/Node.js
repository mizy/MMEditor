import uuid from "uuid/v1";
import defaultNode from "./Nodes/DefaultNodes";
import iconNode from "./Nodes/IconNode";
/**
 * @class
 */
class Node {
	constructor(graph) {
		this.graph = graph;
		this.nodes = {};
		this.paper = graph.editor.paper;
		this.nodeG = this.paper.g();
		this.linkPointsG = this.paper.g();
		this.linkPointsG.addClass("link-points-g");
		this.initDefs();
		this.listenEvent();
		this.shapes = {
			default: defaultNode,
			iconNode: iconNode
		};
	}

	initDefs() {
		this.shadow = this.paper.filter(window.Snap.filter.shadow(3, 1, 0.3));
	}

	// 监听事件
	listenEvent() {
		this.graph.on("paper:click", () => {
			this.unActiveNode();
		});
		this.graph.on("line:click", () => {
			this.unActiveNode();
		});
	}

	/**
	 * 注册node
	 * @param {string} type 形状名称
	 * @param {object} data 复写的形状方法
	 * @param {string} extend 继承的形状，默认为default
	 */
	registeNode(type, data, extend = "default") {
		this.shapes[type] = Object.assign({}, this.shapes[extend], data);
	}

	render(data = {}) {
		Object.keys(data).map(key => {
			this.renderNode(data[key]);
		});
	}

	/**
	 * 添加节点
	 * @param {object} data  
	 */
	addNode = (data = {}) => {
		if (typeof data.uuid === "undefined") {
			data.uuid = uuid();
		}
		const node = this.renderNode(data);
		this.graph.fire("node:change", { node });
	};

	/**
	 * 删除节点
	 *  @param {object} data 
	 */
	deleteNode = (node, ifEvent) => {
		let uuid = node;
		if (node.data) {
			uuid = node.data.uuid;
		}
		const deleteNode = this.nodes[uuid];
		delete this.nodes[uuid];
		!ifEvent && this.graph.fire("node:remove", { node: deleteNode, uuid });
		deleteNode.linkPoints.forEach(point => {
			point.undrag();
			point.unhover();
			point.remove();
			point = null;
		});
		deleteNode.fromLines.forEach(lineId => {
			this.graph.line.deleteLine(lineId, false, true);
		});
		deleteNode.toLines.forEach(lineId => {
			this.graph.line.deleteLine(lineId, false, true);
		});
		deleteNode.undrag();
		deleteNode.unhover();
		deleteNode.unclick();
		deleteNode.remove();
		this.activeNode = null;
	};

	/**
	 * 渲染节点
	 */
	renderNode(item) {
		const key = item.uuid;
		const shape = this.shapes[item.type || "default"];
		shape.paper = this.paper;
		const nodeItem = shape.render(item, this.paper);
		const node = this.paper.g(nodeItem);
		node.shape = nodeItem;
		node.shape.attr({
			class: "mm-node-shape"
		});
		this.nodes[item.uuid] = node;
		node.attr({
			class: "mm-node",
			"data-id": key,
			transform: `translate(${item.x || 0},${item.y || 0})`
		});
		node.toLines = new Set();
		node.fromLines = new Set();
		node.data = item;
		this.addNodeLinkPoints(node, shape);
		this.addNodeEvent(node);
		this.nodeG.add(node);
		return node;
	}

	/**
	 * 根据数据更新节点
	 */
	updateNode(nodeData = {}) {
		const { uuid } = nodeData;
		const node = this.nodes[uuid];
		const shape = this.shapes[nodeData.type || "default"];
		node.animate(
			{
				transform: `translate(${nodeData.x} ,${nodeData.y})`
			},
			200
		);
		node.data = nodeData;
		node.linkPointsTypes.forEach((linkPoint, index) => {
			shape.renderLinkPoint(node, linkPoint, node.linkPoints[index]);
		});
	}

	/**
	 * 给节点添加连线点
	 * @param {node} node
	 */
	addNodeLinkPoints(node, shape) {
		node.linkPoints = [];
		node.linkPointsTypes = shape.linkPoints;
		if (!shape.linkPoints) {
			return false;
		}
		shape.linkPoints.forEach((linkPoint, index) => {
			if (shape.renderLinkPoint) {
				const newCircle = shape.renderLinkPoint(node, linkPoint);
				node.linkPoints.push(newCircle);
				newCircle.attr({
					"data-node-id": node.data.uuid,
					"data-index": index
				});
				this.linkPointsG.add(newCircle);
				this.graph.line.addLinkPointEvent(newCircle, node, index);
				this.addLinkHoverEvent(newCircle, node, index);
			}
		});
	}

	addLinkHoverEvent(point, node) {
		point.hover(
			() => {
				if (this.graph.linkStatus === "lineing") return false;
				node.linkPoints.forEach(point => {
					point.attr({
						display: "block"
					});
				});
			},
			() => {
				if (this.graph.linkStatus === "lineing") return false;
				if (this.activeNode && this.activeNode.data.uuid === node.data.uuid) {
					return false;
				}
				node.linkPoints.forEach(point => {
					point.attr({
						display: "none"
					});
				});
			}
		);
	}

	/**
	 * 给节点添加事件
	 * @param {*} node
	 */
	addNodeEvent(node) {
		node.shape.drag(
			(dx, dy) => {
				const transform = this.paper.transform();
				const info = transform.globalMatrix.split();
				const x = (node.startX || 0) + dx / info.scalex;
				const y = (node.startY || 0) + dy / info.scalex;
				node.data.x = x;
				node.data.y = y;
				node.linkPoints.forEach(circle => {
					this.shapes[node.data.type || "default"].updateLinkPoint(node, circle);
				});
				node.attr({
					transform: `translate(${x} ,${y})`
				});
				this.graph.fire("node:move", { node });
			},
			() => {
				node.startX = node.data.x;
				node.startY = node.data.y;
			},
			() => {
				if (node.startX === node.data.x && node.startY === node.data.y) {
					return false;
				}
				this.graph.fire("node:change", { node });
			}
		);

		node.shape.click(event => {
			if (this.activeNode) {
				this.unActiveNode();
			}
			this.setActiveNode(node);
			this.graph.fire("node:click", { node, event });
		});
		node.hover(
			() => {
				if (this.graph.linkStatus === "lineing") return false;
				node.linkPoints.forEach(point => {
					point.attr({
						display: "block"
					});
				});
			},
			() => {
				if (this.graph.linkStatus === "lineing") return false;
				if (this.activeNode && this.activeNode.data.uuid === node.data.uuid) {
					return false;
				}
				node.linkPoints.forEach(point => {
					point.attr({
						display: "none"
					});
				});
			}
		);
	}

	/**
	 * 
	 */
	unActiveNode() {
		if (!this.activeNode) return false;
		this.activeNode.shape.removeClass("active");
		this.activeNode.shape.attr({
			filter: null
		});
		this.activeNode.linkPoints.forEach(point => {
			point.attr({
				display: "none"
			});
		});
		this.graph.fire("node:unactive", { node: this.activeNode });
		this.activeNode = null;
	}

	/**
	 * 
	 * @param {*} node 
	 */
	setActiveNode(node) {
		node.shape.addClass("active");
		node.shape.attr({
			filter: this.shadow
		});
		this.activeNode = node;
		this.activeNode.linkPoints.forEach(point => {
			point.attr({
				display: "block"
			});
		});
	}

	/**
	 * 
	 */
	clear() {
		const { nodes } = this;
		for (let key in nodes) {
			this.deleteNode(nodes[key], true);
		}
	}
}
export default Node;
