/**
 * @class
 */
class AchorLine {
	constructor(graph) {
		this.graph = graph;
		this.anchorLines = {};
		this.paper = graph.editor.paper;
		this.anchorDistance = graph.editor.config.anchorDistance || 5;
		this.anchorXLength = graph.editor.config.anchorXLength || 10;
		this.anchorYLength = graph.editor.config.anchorYLength || 10;
		this.hideAchorLine = graph.editor.config.hideAchorLine;
		this.hideAchor = graph.editor.config.hideAchor;
		this.anchors = [];
		this.path = this.paper.path();
		this.path.attr({
			class: 'anchor-line'
		});
	}

	/**
	 * 生成所有的吸附线位置
	 */
	makeAllAnchors(origin) {
		if (this.hideAchorLine) return;
		this.node = origin;
		const anchors = [];
		const { nodes } = this.graph.node;
		for (let key in nodes) {
			if (origin.data.uuid === key) continue;
			const node = nodes[key];
			const bbox = node.getBBox();// 缓存bbox
			node.bbox = bbox;
			const { x, y, width, height } = bbox;
			anchors.push({
				x, y
			}, {
				x: x + width, y
			}, {
				x: x + width, y: y + height
			}, {
				x: x, y: y + height
			}, {
				x: x + width / 2, y: y + height / 2
			});
		}

		this.anchors = anchors;
	}

	checkAchor(x, y) {
		const { anchorXLength, anchorYLength } = this;
		const x5 = x % anchorXLength;
		const y5 = y % anchorYLength;
		if (x5 < anchorXLength / 2) {
			x = Math.floor(x / anchorXLength) * anchorXLength;
		} else {
			x = Math.ceil(x / anchorXLength) * anchorXLength;
		}
		if (y5 < anchorYLength / 2) {
			y = Math.floor(y / anchorYLength) * anchorYLength;
		} else {
			y = Math.ceil(y / anchorYLength) * anchorYLength;
		}
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
			let final = {}; let newXY = { x, y }; let coordFlag = '';
			const anchor = this.anchors.find(anchor => {
				return nowPoints.find((point, index) => {
					const deltaY = anchor.y - point.y;
					const deltaX = anchor.x - point.x;
					if (Math.abs(deltaX) < this.anchorDistance) {
						final.x = anchor.x;
						newXY.x += deltaX;
						coordFlag = 'x';
						return true;
					}
					if (Math.abs(deltaY) < this.anchorDistance) {
						final.y = anchor.y;
						newXY.y += deltaY;
						coordFlag = 'y';
						return true;
					}
				});
			});
			if (!anchor) {
				this.path.node.style.display = 'none';
				if (!this.hideAchor) return this.checkAchor(x, y);
				return { x, y };
			}
			// 中心点坐标补齐
			if (final.x === undefined) {
				final.x = cc.x;
			} else {
				final.y = cc.y;
			}
			const path = `M${final.x},${final.y} L${anchor.x},${anchor.y}`;
			this.path.node.setAttribute('d', path);
			this.path.node.style.display = 'block';
			if (!this.hideAchor) {
				const anchorXY = this.checkAchor(newXY.x, newXY.y);
				anchorXY[coordFlag] = newXY[coordFlag];
				return anchorXY;
			}
			return newXY;
		}
		if (!this.hideAchor) return this.checkAchor(x, y);
		return { x, y };
	}

	/**
	 * 隐藏线
	 */
	hidePath() {
		this.path.attr({
			style: 'display: none'
		});
	}
}
export default AchorLine;
