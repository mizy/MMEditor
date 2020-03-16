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
		this.scale = 1;
		/**
		 * 所有吸附节点
		 */
		this.achors = [];
		this.listenEvents();
	}

	/**
	 * 自适应
	 */
	autoFit() {
		const width = this.editor.dom.node.clientWidth;
		const height = this.editor.dom.node.clientHeight;
		const bbox = this.paper.getBBox();
		const transform = this.paper.transform();
		const matrix = transform.localMatrix;
		const { scalex } = matrix.split();
		matrix.translate(((width - bbox.width) / 2 - bbox.x) / scalex, ((height - bbox.height) / 2 - bbox.y) / scalex);
		const transformString = matrix.toTransformString();
		this.paper.node.style.transition = 'transform 200ms ease-out';
		this.paper.transform(transformString);
		setTimeout(() => {
			this.paper.node.style.transition = null;
		}, 200)
	}


	listenEvents() {
		this.svg.mousedown(this.panStart);
		this.svg.mouseup(this.panStop);
		this.svg.node.addEventListener('mouseleave', this.panStop);
		this.svg.node.addEventListener("wheel", this.onWheel);
	}

	clear() {
		this.svg.unmousedown(this.panStart);
		this.svg.node.removeEventListener('mouseleave', this.panStop);
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
	/**
	 * 移动到指定位置
	 * @param  {} x
	 * @param  {} y
	 */
	pan(x, y) {
		const transform = this.paper.transform();
		const { scalex } = transform.localMatrix.split();
		transform.localMatrix.translate(x / scalex, y / scalex);
		const transformString = transform.localMatrix.toTransformString();
		this.paper.transform(transformString)
	}

	onWheel = e => {
		e.preventDefault();
		if (e.ctrlKey) {// 双指
			const newScale = (1 - e.deltaY * this.scaleRatio);
			this.zoom(newScale, e.offsetX, e.offsetY)
		} else {
			this.pan(-e.deltaX, -e.deltaY)
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
	/**
	 * 缩放
	 * @param  {} scale 当前基础上 缩放多少
	 * @param  {} cx=0 zoom 缩放中心点x
	 * @param  {} cy=0 zoom 缩放中心点y
	 */
	zoom = (newScale, cx = 0, cy = 0) => {
		const transform = this.paper.transform();
		transform.localMatrix.scale(newScale, newScale, cx, cy);
		const transformString = transform.localMatrix.toTransformString();
		this.paper.transform(transformString);
	};

	panning = ev => {
		ev.preventDefault();
		const p1 = { x: ev.clientX, y: ev.clientY };

		const p2 = this.startPosition;

		const deltaP = [p2.x - p1.x, p2.y - p1.y];
		const transform = this.paper.transform();
		const { scalex } = transform.localMatrix.split();
		transform.localMatrix.translate(-deltaP[0] / scalex, -deltaP[1] / scalex);
		const transformString = transform.localMatrix.toTransformString();
		this.paper.transform(transformString);
		this.startPosition = p1;
	};
}
export default Controller;