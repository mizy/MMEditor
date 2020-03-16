class AchorLine {
	constructor(graph) {
		this.graph = graph;
		this.achorLines = {};
		this.paper = graph.editor.paper;
		this.achorDistance = graph.editor.config.achorDistance || 10;
		this.hide = graph.editor.config.hideAchor || true;
		this.achors = [];
		this.path = this.paper.path();
		this.path.attr({
			class: "achor-line"
		})
	}

	/**
	 * 生成所有的吸附线位置
	 */
	makeAllAnchors(origin) {
		this.node = origin;
		const achors = [];
		const { nodes } = this.graph.node;
		for (let key in nodes) {
			if (origin.data.uuid === key) continue;
			const node = nodes[key];
			const bbox = node.getBBox();
			const { x, y, width, height } = bbox;
			achors.push({
				x, y
			}, {
				x: x + width, y
			}, {
				x: x + width, y: y + height
			}, {
				x: x, y: y + height
			}, {
				x: x + width / 2, y: y + height / 2
			})
		}

		this.achors = achors;
	}

	/**
	 * 画节点
	 * @param {*} node 
	 */
	check(x, y) {
		const { bbox } = this.node;
		const { width, height } = bbox;
		const tl = { x, y };
		const tr = { x: x + width, y };
		const br = { x: x + width, y: y + height };
		const bl = { x, y: y + height };
		const cc = { x: x + width / 2, y: y + height / 2 };
		const nowPoints = [tl, tr, br, bl, cc];
		let final = {}, newXY = { x, y };
		const achor = this.achors.find(achor => {
			return nowPoints.find((point, index) => {
				const deltaY = achor.y - point.y;
				const deltaX = achor.x - point.x;
				if (Math.abs(deltaX) < this.achorDistance) {
					final.x = achor.x;
					newXY.x += deltaX
					return true;
				}
				if (Math.abs(deltaY) < this.achorDistance) {
					final.y = achor.y;
					newXY.y += deltaY;
					return true
				}
			})
		})
		if (!achor) {
			this.path.attr({
				style: "display: 'none'"
			})
			return null
		}
		// 中心点坐标补齐
		!final.x ? final.x = cc.x : final.y = cc.y;
		const path = `M${final.x},${final.y} L${achor.x},${achor.y}`;
		this.path.attr({
			path,
			style: "display: 'auto'"
		});
		return newXY;
	}
}
export default AchorLine;