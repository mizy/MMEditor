import uuid from 'uuid/v1';
import defaultNode from './Nodes/DefaultNodes';
import iconNode from './Nodes/IconNode';
import { Snap } from "../MMEditor";

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
		this.linkPointsG.addClass('link-points-g');
		this.initDefs();
		this.listenEvent();
		this.actives = {};
		this.shapes = {
			default: defaultNode,
			iconNode: iconNode
		};
	}

	initDefs() {
		this.shadow = this.paper.filter(Snap.filter.shadow(3, 1, 0.3));
	}

	// 监听事件
	listenEvent() {
		this.graph.on('paper:click', () => {
			this.unActive();
		});
		this.graph.on('line:click', () => {
			this.unActive();
		});
		this.graph.on('copy', () => {
			const activeNode = {
				...this.actives
			};
			let newActiveNode = {};
			for (let node in activeNode) {
				newActiveNode[node] = {
					...activeNode[node],
					data: JSON.parse(JSON.stringify(activeNode[node].data))
				};
			}
			this.copyNode = newActiveNode;
		});
		this.graph.on('paste', () => {
			this.unActive();
			for (let key in this.copyNode) {
				const node = this.copyNode[key];
				let newData = { ...node.data };
				newData.x += 20 + Math.random() * 20;
				newData.y += 20 + Math.random() * 20;
				delete newData.uuid;
				const newNode = this.addNode(newData);
				this.setActive(newNode);
			}
		});
	}

	/**
	 * 注册node
	 * @param {string} type 形状名称
	 * @param {object} data 复写的形状方法
	 * @param {string} extend 继承的形状，默认为default
	 */
	registeNode(type, data, extend = 'default') {
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
		if (typeof data.uuid === 'undefined') {
			data.uuid = uuid();
		}
		if (data.uuid && data.uuid.indexOf('-') > -1) {
			console.log(data.uuid);
			data.uuid = data.uuid.replace(/-/g, '');
		}
		const node = this.renderNode(data);
		this.graph.fire('node:change', { node });
		return node;
	};

	/**
	 * 删除节点
	 *  @param {object} data
	 */
	deleteNode = (node, ignoreEvent) => {
		let uuid = node;
		if (node.data) {
			uuid = node.data.uuid;
		}
		const deleteNode = this.nodes[uuid];
		delete this.nodes[uuid];
		!ignoreEvent && this.graph.fire('node:remove', { node: deleteNode, uuid });
		deleteNode.linkPoints.forEach(point => {
			point.undrag();
			point.unhover();
			point.remove();
			point = null;
		});
		deleteNode.fromLines.forEach(lineId => {
			this.graph.line.deleteLine(lineId, true, true);
		});
		deleteNode.toLines.forEach(lineId => {
			this.graph.line.deleteLine(lineId, true, true);
		});
		deleteNode.undrag();
		deleteNode.unhover();
		deleteNode.unclick();
		deleteNode.remove();
	};

	/**
	 * 渲染节点
	 */
	renderNode(item) {
		const key = item.uuid;
		const shape = this.shapes[item.type || 'default'];
		shape.paper = this.paper;
		const nodeItem = shape.render(item, this.paper);
		const node = this.paper.g(nodeItem);
		node.shape = nodeItem;
		node.shape.attr({
			class: 'mm-node-shape'
		});
		this.nodes[item.uuid] = node;
		node.node.setAttribute('class', 'mm-node');
		node.node.setAttribute('data-id', key);
		node.node.setAttribute('transform', `translate(${item.x || 0},${item.y || 0})`);
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
		const shape = this.shapes[nodeData.type || 'default'];
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
					'data-node-id': node.data.uuid,
					'data-index': index
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
				if (this.graph.linkStatus === 'lineing') return false;
				node.linkPoints.forEach(point => {
					point.attr({
						display: 'block'
					});
				});
			},
			() => {
				if (this.graph.linkStatus === 'lineing') return false;
				if (this.actives[node.data.uuid]) {
					return false;
				}
				node.linkPoints.forEach(point => {
					point.attr({
						display: 'none'
					});
				});
			}
		);
	}

	panNode(node, info, dx, dy) {
		let x = (node.startX || 0) + dx / info.scalex;
		let y = (node.startY || 0) + dy / info.scalex;
		const newXY = this.graph.anchorLine.check(x, y);
		if (newXY) {
			x = newXY.x;
			y = newXY.y;
		}
		node.data.x = x;
		node.data.y = y;
		node.linkPoints.forEach(circle => {
			this.shapes[node.data.type || 'default'].updateLinkPoint(node, circle);
		});
		node.node.setAttribute('transform', `translate(${x} ,${y})`);
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
				if (this.actives[node.data.uuid]) {
					for (let key in this.actives) {
						this.panNode(this.actives[key], info, dx, dy);
						this.graph.line.updateByNode(this.actives[key]);
					}
				} else {
					this.panNode(node, info, dx, dy);
				}

				this.graph.fire('node:move', { node });

			},
			(x, y, e) => {
				// 拖动时是否有选中其他
				for (let key in this.actives) {
					this.actives[key].startX = this.actives[key].data.x;
					this.actives[key].startY = this.actives[key].data.y;
				}
				this.graph.anchorLine.makeAllAnchors(node);
				node.bbox = node.getBBox();
				node.clientX = e.clientX;
				node.clientY = e.clientY;
				// 提前获得bbox避免重绘
				node.startX = node.data.x;
				node.startY = node.data.y;
			},
			(e) => {
				this.graph.anchorLine.hidePath();
				if (node.startX === node.data.x && node.startY === node.data.y) {
					return false;
				}
				this.graph.fire('node:change', { node });
			}
		);

		node.shape.click(event => {
			if (Math.abs(event.clientX - node.clientX) < 2 && Math.abs(event.clientY - node.clientY) < 2) {
				if (event.shiftKey) {
					if (this.actives[node.data.uuid]) {
						this.unActive(node);
					} else {
						this.setActive(node);
					}
				} else {
					this.unActive();
					this.setActive(node);
				}
				this.graph.fire('node:click', { node, event });
			}
		});
		node.hover(
			() => {
				if (this.graph.linkStatus === 'lineing') return false;
				node.linkPoints.forEach(point => {
					point.node.style.display = 'block';
				});
				this.graph.fire('node:mouseenter', { node, event });
			},
			() => {
				if (this.graph.linkStatus === 'lineing') return false;
				if (this.actives[node.data.uuid]) {
					return false;
				}
				node.linkPoints.forEach(point => {
					point.node.style.display = 'none';
				});
				this.graph.fire('node:mouseleave', { node, event });
			}
		);
	}

	/**
	 *
	 * @param {*} node node为空时全选
	 */
	setActive(node) {
		const nodes = node ? {
			[node.data.uuid]: node
		} : this.nodes;

		for (let key in nodes) {
			node = nodes[key];
			node.shape.addClass('active');
			node.shape.attr({
				filter: this.shadow
			});
			this.actives[node.data.uuid] = node;
			node.linkPoints.forEach(point => {
				point.node.style.display = 'block';
			});
		}
	}

	/**
	 *
	 * @param {*} node 传node就取消选中这个node,没有就全部取消选中
	 */
	unActive(node) {
		if (node) {
			delete this.actives[node.data.uuid];
			this.unActiveNode(node);
		} else {
			for (let key in this.actives) {
				this.unActiveNode(this.actives[key]);
			}
			this.actives = {};
		}
		this.graph.fire('node:unactive', { node: node});
	}

	unActiveNode(node) {
		node.shape.removeClass('active');
		node.shape.attr({
			filter: null
		});
		node.linkPoints.forEach(point => {
			point.node.style.display = 'none';
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
