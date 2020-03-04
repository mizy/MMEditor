import Event from "./Event";
/**
 * 控制器
 * @class
 * @extends Event
 */
class Controller extends Event {
	constructor(editor) {
		super();
		this.editor = editor;
		this.paper = editor.paper;
		this.svg = editor.svg;
		/**
		 * 缩放比例系数
		 * @type {number}
		 */
		this.scaleRatio = 0.01;
		this.listenEvents();
	}

	/**
	 * 自适应
	 */
	autoFit() {
		const width = this.editor.dom.node.clientWidth;
		const height = this.editor.dom.node.clientHeight;
		const bbox = this.paper.getBBox();
		let ratio = 1;
		if (bbox.width > width) {
			ratio = (2 * bbox.width) / width;
		}
		let svgWidth = bbox.width / ratio;
		let svgHeight = bbox.height / ratio;
		const matrix = Snap.matrix();
		matrix.translate(width / 2 - bbox.x, height /2 - bbox.y);
		matrix.scale(1 / ratio, 1 / ratio);
		const transformString = matrix.toTransformString();
		this.paper.transform(transformString);
	}

	listenEvents() {
		this.svg.mousedown(this.panStart);
		this.svg.mouseup(this.panStop);
		this.svg.mouseout(this.panStop);
		this.svg.node.addEventListener("wheel", this.onWheel);
	}

	clear() {
		this.svg.unmousedown(this.panStart);
		this.svg.node.removeEventListener("wheel", this.onWheel);
	}

	/**
	 * 禁用滚轮缩放
	 */
	disableWheel() {
		this.svg.node.removeEventListener("wheel", this.onWheel);
	}

	/**
	 * 禁用鼠标移动
	 */
	disablePan() {
		this.svg.unmousedown(this.panStart);
	}

	pan(x, y) {
		this.paper.transform(`translate(${x}px,${y}px)`);
	}

	onWheel = e => {
		e.preventDefault();
		if (e.deltaY > 0) {
			this.zoomIn(Math.abs(e.deltaY));
		} else {
			this.zoomOut(Math.abs(e.deltaY));
		}
	};

	panStart = ev => {
		ev.preventDefault();
		if (ev.target.tagName !== "svg") {
			return;
		}
		this.startPosition = { x: ev.clientX, y: ev.clientY };
		this.matrix = this.svg.mousemove(this.panning);
	};

	panStop = ev => {
		ev.preventDefault();
		this.svg.unmousemove(this.panning);
		// this.svg.unmouseup(this.panStop);
		this.dispatch("panEnd", { event: ev });
	};

	zoomIn = () => {
		const transform = this.paper.transform();
		const scale = transform.localMatrix.split();
		const { dx, dy, scalex } = scale;
		let newScale = 1 + (1 / scalex) * this.scaleRatio;
		transform.localMatrix.scale(newScale, newScale, dx, dy);
		const transformString = transform.localMatrix.toTransformString();
		this.paper.transform(transformString);
	};

	zoomOut = () => {
		const transform = this.paper.transform();
		const scale = transform.localMatrix.split();
		const { dx, dy, scalex } = scale;
		let newScale = 1 - Math.pow(scalex, 2) * this.scaleRatio;
		transform.localMatrix.scale(newScale, newScale, dx, dy);
		const transformString = transform.localMatrix.toTransformString();
		this.paper.transform(transformString);
	};

	panning = ev => {
		ev.preventDefault();
		const p1 = { x: ev.clientX, y: ev.clientY };

		const p2 = this.startPosition;

		const deltaP = [p2.x - p1.x, p2.y - p1.y];
		const transform = this.paper.transform();
		transform.localMatrix.translate(-deltaP[0], -deltaP[1]);
		const transformString = transform.localMatrix.toTransformString();
		this.paper.transform(transformString);
		this.startPosition = p1;
	};
}
export default Controller;