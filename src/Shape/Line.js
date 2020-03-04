import DefaultLine from "./Lines/Line";
/**
 * @class
 */
class Line {
	constructor(graph) {
		this.graph = graph;
		this.node = graph.node;
		this.paper = graph.editor.paper;
		this.lines = [];
		this.lineG = this.paper.g();
		this.allLinkPointsXY = [];
		this.shapes = {
			default: DefaultLine,
			tempLine: {
				render: paper => {
					const path = paper.path();
					path.attr({
						stroke: "#abc",
						strokeDasharray: "10 10"
					});
					return path;
				},
				renderPath: ({ fromX, fromY, x, y }, line) => {
					line.attr({
						d: `M${fromX} ${fromY}L${x} ${y}`
					});
				}
			}
		};
		this.listenEvent();
	}

	// 监听事件
	listenEvent() {
		this.graph.on("paper:click", () => {
			this.unActiveLine();
		});
		this.graph.on("node:click", () => {
			this.unActiveLine();
		});
	}

	/**
	 * 添加线
	 * @param {*} data 
	 */
	addLine(data) {
		const line = this.renderLine(data);
		this.graph.fire("line:add", { line, type: "add" });
	}

	/**
	 * 添加虚拟的连线，用于新建链接
	 * @param {*} lineData
	 */
	addTempLine(lineData) {
		this.tempLine = this.paper.path();
		this.tempLine.data = lineData;
	}

	/**
	 * 跟下该node的线
	 * @param {ele} node
	 */
	updateByNode(node) {
		node.fromLines.forEach(lineId => {
			this.updateLine(lineId);
		});
		node.toLines.forEach(lineId => {
			this.updateLine(lineId);
		});
	}

	/**
	 * 重绘某个线
	 * @param {*} lineId
	 */
	updateLine(lineId) {
		const line = this.lines[lineId];
		const { nodes } = this.graph.node;
		const {
			data: { type }
		} = line;
		const { data } = this.shapes[type || "default"].render(line.data, nodes, line.shape);
		this.shapes[type || "default"].renderArrow(line.data, nodes, line.arrow);
		line.data = Object.assign({}, line.data, data);
	}

	/**
	 * 添加线
	 * @param {*} lineData
	 */
	renderLine(lineData) {
		const key = this.getLineId(lineData);
		const { nodes } = this.node;
		const shape = this.shapes[lineData.type || "default"];
		shape.paper = this.paper;
		const newLine = shape.render(lineData, nodes);
		const arrow = shape.renderArrow(lineData, nodes);

		const g = this.paper.g();
		g.append(newLine.path);
		g.append(arrow);
		g.data = Object.assign(
			{
				uuid: key
			},
			lineData,
			newLine.data
		);
		g.shape = newLine.path;
		g.arrow = arrow;
		g.attr({
			class: "mm-line"
		});
		newLine.path.attr({
			class: "mm-line-shape"
		});
		this.addToNodes(nodes, g);
		this.addLineEvents(g);
		this.lines[key] = g;
		this.lineG.add(g);
		return g;
	}

	/**
	 * 删除线
	 * @param {*} uuid
	 */
	deleteLine(data, notEvent, byNode) {
		let uuid = data;
		if (data.data) {
			uuid = data.data.uuid;
		}
		const { nodes } = this.node;
		const line = this.lines[uuid];
		delete this.lines[uuid];
		// 删除关联线
		const { from, to } = line.data;
		const id = this.getLineId(line.data);
		nodes[from] && nodes[from].toLines.delete(id);
		nodes[to] && nodes[to].fromLines.delete(id);
		!notEvent &&
			// 是否由删除节点触发的线删除操作
			this.graph.fire("line:remove", {
				line,
				uuid,
				before: line.data,
				byNode,
				type: "remove"
			});
		line.arrow.remove();
		line.arrow.undrag();
		line.arrow = null;
		line.unclick();
		line.remove();
		this.activeLine = null;
	}

	getLineId(lineData) {
		const { from, to, fromPoint = 0, toPoint = 0 } = lineData;
		return `${from}.${fromPoint}=>${to}.${toPoint}`;
	}

	/**
	 * 更新线为
	 * @param {*} line
	 * @param {*} x
	 * @param {*} y
	 */
	updateActiveLine = g => {
		const {
			hoverLinkPoint,
			node: { nodes }
		} = this.graph;
		const {
			data: { to, uuid }
		} = g;
		const line = this.lines[uuid];
		if (hoverLinkPoint) {
			const toElement = hoverLinkPoint.toElement || hoverLinkPoint.node;
			const beforeData = Object.assign({}, line.data);
			line.data.to = toElement.getAttribute("data-node-id");
			line.data.toPoint = parseInt(toElement.getAttribute("data-index"), 10);
			// 删除节点入口关联的线，给新链接的节点加上入口线
			nodes[to].fromLines.delete(uuid);
			nodes[line.data.to].fromLines.add(uuid);
			this.graph.fire("line:change", { line, type: "change", before: beforeData });
			hoverLinkPoint.removeClass && hoverLinkPoint.removeClass("hover")
		}
		this.updateLine(uuid);
	};

	/**
	 * 检查是否生成新线
	 */
	checkNewLine = (e) => {
		const { hoverLinkPoint } = this.graph;
		if (hoverLinkPoint) {
			const toElement = hoverLinkPoint.toElement || hoverLinkPoint.node;
			const toNodeId = toElement.getAttribute("data-node-id");
			const toPoint = toElement.getAttribute("data-index");
			const { from, fromPoint = 0 } = this.tempLineData;
			const data = Object.assign(
				{
					uuid: `${from}.${fromPoint}=>${toNodeId}.${toPoint}`,
					to: toNodeId,
					toPoint
				},
				this.tempLineData
			);
			if (this.lines[data.uuid]) return;
			if (this.shapes["default"].checkNewLine(data, this.graph.editor)) {
				this.addLine(data);
			}
			hoverLinkPoint.removeClass && hoverLinkPoint.removeClass("hover")
			this.graph.hoverLinkPoint = undefined;
		}

	};

	/**
	 * 注册线
	 * @param {*} data 
	 */
	registeLine(data) {
		const { type } = data;
		this.shapes[type] = Object.assign({}, this.shapes["default"], data);
	}

	/**
	 * 
	 * @param {*} lines 
	 */
	render(lines = []) {
		Object.keys(lines).map(key => {
			const item = lines[key];
			this.renderLine(item);
		});
	}

	/**
	 * 
	 * @param {*} nodes 
	 * @param {*} g 
	 */
	addToNodes(nodes, g) {
		const { from, to } = g.data;
		const id = this.getLineId(g.data);
		nodes[from].toLines.add(id);
		nodes[to].fromLines.add(id);
	}

	/**
	 * 绑定线拖动事件
	 * @param {*} g
	 */
	addLineEvents(g) {
		// 箭头拖拽
		g.arrow.drag(
			(dx, dy) => {
				const { shape, data } = g;
				let x = (g.startX || 0) + dx;
				let y = (g.startY || 0) + dy;
				// 计算磁吸坐标
				const newXY = this.calcLinkPoint(x, y, data.type);
				if (newXY) {
					x = newXY[0]; y = newXY[1];
				}
				shape.attr({
					d: `M${data.fromX} ${data.fromY}L${x} ${y}`
				});
			},
			() => {
				const { arrow, shape, data } = g;
				const { toX, toY } = data;
				g.startX = toX;
				g.startY = toY - 2;
				arrow.attr({
					display: "none"
				});
				shape.attr({
					strokeDasharray: "5 5"
				});
				this.makeAdsorbPoints();
				this.graph.addLinkHoverEvent();
				data.status = "active";
				this.graph.fire("line:drag");
			},
			() => {
				const { arrow, shape } = g;
				arrow.attr({
					display: "initial"
				});
				shape.attr({
					strokeDasharray: "0"
				});
				this.updateActiveLine(g);
				this.graph.offLinkHoverEvent();
			}
		);
		g.shape.click(e => {
			this.setActiveLine(g);
			this.graph.fire("line:click", { line: g, event: e });
		});
	}

	/**
	 * 
	 * @param {*} line 
	 */
	setActiveLine(line) {
		this.unActiveLine();
		this.activeLine = line;
		this.activeLine.addClass("active");
	}

	/**
	 * 取消激活
	 */
	unActiveLine() {
		if (this.activeLine) {
			this.activeLine.removeClass("active");
		}
		this.activeLine = null;
	}

	//计算磁吸
	calcLinkPoint = (x, y, type = 'default') => {
		const { adsorb = [20, 20] } = this.graph.node.shapes[type];
		const newXY = this.allLinkPointsXY.find(item => {
			if (Math.abs(x - item[0]) < adsorb[0] && Math.abs(y - item[1]) < adsorb[1]) {
				this.graph.hoverLinkPoint && this.graph.hoverLinkPoint.removeClass && this.graph.hoverLinkPoint.removeClass("hover");
				this.graph.hoverLinkPoint = item[2];
				item[2].addClass("hover");
				return item;
			}
		})
		if (!newXY) {
			this.graph.hoverLinkPoint && this.graph.hoverLinkPoint.removeClass("hover")
		}
		return newXY
	}

	// 生成磁吸
	makeAdsorbPoints = () => {
		const linkPoints = this.paper.selectAll(".mm-link-points");
		this.allLinkPointsXY = [];
		linkPoints.forEach(item => {
			const x = parseInt(item.attr("cx"));
			const y = parseInt(item.attr("cy"));
			this.allLinkPointsXY.push([x, y, item])
		})
	}

	/**
	 * 节点的新增线逻辑
	 */
	addLinkPointEvent = (point, node, index) => {
		point.drag(
			(dx, dy) => {
				const {
					tempLineData: { fromX, fromY }
				} = this;
				const transform = this.paper.transform();
				const info = transform.globalMatrix.split();
				let x = (fromX || 0) + dx / info.scalex + 1;
				let y = (fromY || 0) + dy / info.scalex - 1;

				// 计算磁吸坐标
				const newXY = this.calcLinkPoint(x, y, node.data.type);
				if (newXY) {
					x = newXY[0]; y = newXY[1];
				}
				this.shapes.tempLine.renderPath(
					{
						fromX,
						fromY,
						x,
						y
					},
					this.tempLine
				);
			},
			() => {
				this.tempLineData = {
					from: node.data.uuid,
					fromPoint: index,
					fromX: point.x,
					fromY: point.y
				};
				this.makeAdsorbPoints();
				this.graph.addLinkHoverEvent();
				this.tempLine = this.shapes.tempLine.render(this.paper);
				this.graph.fire("line:drag");
			},
			(e) => {
				this.checkNewLine(e);
				this.tempLine.remove();
				this.graph.fire("line:drop");
			}
		);
	};

	/**
	 * 
	 */
	clear() {
		const { lines } = this;
		for (let key in lines) {
			this.deleteLine(lines[key], true);
		}
	}
}
export default Line;
