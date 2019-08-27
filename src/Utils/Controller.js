import Event from "./Event";
export default class Controller extends Event {
	constructor(editor) {
		super();
		this.editor = editor;
		this.paper = editor.paper;
		this.svg = editor.svg;
		this.scaleRatio = 0.01;
		this.listenEvents();
	}

	listenEvents() {
		this.svg.mousedown(this.panStart);
		this.svg.mouseup(this.panStop);
		this.svg.node.addEventListener("wheel", this.onWheel);
	}

	clear() {
		this.svg.unmousedown(this.panStart);
		this.svg.node.removeEventListener("wheel", this.onWheel);
	}

	disableWheel() {
		this.svg.node.removeEventListener("wheel", this.onWheel);
	}

	disablePan() {
		this.svg.unmousedown(this.panStart);
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
