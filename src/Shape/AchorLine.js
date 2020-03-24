class AchorLine {
	constructor(graph) {
		this.graph = graph;
		this.achorLines = {};
		this.paper = graph.editor.paper;
		this.achorDistance = graph.editor.config.achorDistance || 5;
		this.hideAchorLine = graph.editor.config.hideAchorLine;
		this.hideAchor = graph.editor.config.hideAchor;
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
		if (this.hideAchorLine) return;
		this.node = origin;
		const achors = [];
		const { nodes } = this.graph.node;
		for (let key in nodes) {
			if (origin.data.uuid === key) continue;
			const node = nodes[key];
			const bbox = node.getBBox();// 缓存bbox
			node.bbox = bbox;
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

	checkAchor(x, y) {
		const x5 = x % 5;
		const y5 = y % 5;
		if (x5 < 2.5) {
			x = Math.floor(x / 5) * 5;
		} else {
			x = Math.ceir(x / 5) * 5;
		}
		if (y5 < 2.5) {
			y = Math.floor(y / 5) * 5;
		} else {
			y = Math.ceir(y / 5) * 5;
		}
		console.log()
		return { x, y };
	}

	/**
	 * 画节点
	 * @param {*} node 
	 */
	check(x, y) {
		if (!this.hideAchorLine) {
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
					style: "display: none"
				})
				if (!this.hideAchor) return this.checkAchor(x, y)
				return { x, y }
			}
			// 中心点坐标补齐
			!final.x ? final.x = cc.x : final.y = cc.y;
			const path = `M${final.x},${final.y} L${achor.x},${achor.y}`;
			this.path.attr({
				d: path,
				style: "display: block"
			});
			return newXY;
		}
		if (!this.hideAchor) return this.checkAchor(x, y)
		return { x, y }
	}

	hidePath() {
		this.path.attr({
			style: "display: none"
		})
	}
}
export default AchorLine;