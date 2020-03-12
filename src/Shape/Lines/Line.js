/**
 * graph.line.shapes
 * @interface
 */
const DefaultLine = {

	/**
	 * @param  {} data
	 * @param  {} allNodesMap
	 * @param  {} line
	 */
	render(data, allNodesMap, line) {
		const { from, to, fromPoint = 0, toPoint = 0 } = data;
		const fromNode = allNodesMap[from];
		const toNode = allNodesMap[to];
		const fromPointNode = fromNode.linkPoints[fromPoint];
		const toPointNode = toNode.linkPoints[toPoint];
		let fromX = fromPointNode.x;
		let fromY = fromPointNode.y;
		let toX = toPointNode.x;
		let toY = toPointNode.y;
		const pathString = this.makePath(fromX, fromY, toX, toY, fromPointNode, toPointNode);
		const path = line ? line : this.paper.path();
		path.attr({
			d: pathString,
			strokeDasharray: "10",
			fill: "transparent",
			stroke: "rgba(178,190,205,0.7)"
		});
		path.animate(
			{
				strokeDasharray: "0"
			},
			300
		);
		return {
			path,
			data: {
				fromX,
				fromY,
				toX,
				toY
			}
		};
	},


	/**
	 * @param  {} fromX
	 * @param  {} fromY
	 * @param  {} toX
	 * @param  {} toY
	 * @param  {} fromPointNode
	 * @param  {} toPointNode
	 */
	makePath(fromX, fromY, toX, toY, fromPointNode, toPointNode) {
		let edgeX = fromX;
		let edgeY = fromY;
		let endX = toX;
		let endY = toY;
		const arrowStartSpace = 1; // 顶部距离node节点的距离
		const arrEndSpace = 8; // 地步距离node节点的距离
		if (fromPointNode.data.y === 1) {
			edgeY += arrowStartSpace;
		} else if (fromPointNode.data.y === 0) {
			edgeY -= arrowStartSpace;
		} else if (fromPointNode.data.x === 0) {
			edgeX -= arrowStartSpace;
		} else if (fromPointNode.data.x === 1) {
			edgeX += arrowStartSpace;
		}
		if (toPointNode.data.y === 1) {
			endY += arrEndSpace;
			toY += 5;
		} else if (toPointNode.data.y === 0) {
			endY -= arrEndSpace;
			toY -= 5;
		} else if (toPointNode.data.x === 0) {
			endX -= arrEndSpace;
			toX -= 5;
		} else if (toPointNode.data.x === 1) {
			endX += arrEndSpace;
			toX += 5;
		}
		let pathString = `M${fromX} ${fromY} T ${edgeX} ${edgeY}`;
		let bezierPoint1 = `${edgeX} ${edgeY + Math.max(
			(fromPointNode.data.y === 1 ? 1 : -1) * Math.abs((edgeY - endY) / 2),
			50
		)}`;
		let bezierPoint2 = `${endX} ${endY + Math.min(
			(toPointNode.data.y === 1 ? 1 : -1) * Math.abs((edgeY - endY) / 2),
			-50
		)}`;
		let toPointString = `${endX} ${endY} T ${toX} ${toY} `;
		const path = `${pathString}C${bezierPoint1} ${bezierPoint2} ${toPointString}`;
		return path;
	},


	/**
	 * @param  {} data
	 * @param  {} allNodesMap
	 * @param  {} arrow
	 */
	renderArrow(data, allNodesMap, arrow) {
		const { to, toPoint = 0 } = data;
		const toNode = allNodesMap[to];
		const toPointNode = toNode.linkPoints[toPoint];
		const toLinkPoint = toNode.linkPointsTypes[toPoint];
		let angle = 0;
		if (toLinkPoint.y === 0) {
			angle = 180;
		} else if (toLinkPoint.x === 1) {
			angle = 90;
		} else if (toLinkPoint.x === 0) {
			angle = 270;
		}
		const toX = toPointNode.x;
		const toY = toPointNode.y;
		const pathString = `M${-5} ${10}L${0} ${0}L${5} ${10}Z`;
		const path = arrow ? arrow : this.paper.path();
		// 进行角度的中心变换
		const matrix = new window.Snap.Matrix();
		matrix.translate(toX, toY);
		matrix.rotate(angle, 0, 0);
		path.attr({
			class: "mm-line-arrow",
			d: pathString,
			fill: "rgba(178,190,205,0.7)",
			transform: matrix.toTransformString()
		});
		path.angle = angle;
		return path;
	},

	/**
	 * @param  {} data
	 */
	checkNewLine(data) {
		const { from, to } = data;
		if (from === to) {
			return false;
		}
		return true;
	}
};
export default DefaultLine