import Canvg from 'canvg';
// 使用html
class MiniMap {
	constructor(editor) {
		this.editor = editor;
		const {minimap=[]} = editor.config
		this.width = minimap.width||160;
		this.height =  minimap.height||160;
		this.padding =  minimap.padding||20;
		this.scale = minimap.scale||10;
	}

	setData(data) {
		this.data = data;
		this.render();
	}

	init() {
		const dom = `<div class="mm-minimap" >
			<canvas width="100%" height="100%"></canvas>
			<div class="drag-rect" style="left:${this.padding}px;top:${this.padding}px">
				<div class="drag-point"></div>
			</div>
		</div>`;
		const can = document.createElement("div");
		can.innerHTML = dom;
		this.container = can.querySelector(".mm-minimap");
		this.editor.container.append(this.container);
		this.canvas = this.container.querySelector("canvas");
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.ctx = this.canvas.getContext("2d");
		this.drag = Snap(this.container.querySelector(".drag-rect"));
		this.dragPoint = Snap(this.container.querySelector(".drag-point"));
		this.initEvent();
	}

	initEvent() {
		const {controller} = this.editor;
		this.drag.drag((dx, dy) => {
			const dleft = dx + this.dragStart.x;
			const dtop = dy + this.dragStart.y;
			const left = Math.min(Math.max(dleft, 0),this.width - this.dragBBox.width + 40);
			const top = Math.min(Math.max(dtop, 0),this.height - this.dragBBox.height + 40);
			this.drag.node.style.left = left + "px";
			this.drag.node.style.top = top + "px";
			controller.moveTo(-(left-20)*this.scale,-(top-20)*this.scale)
		}, () => {
			const { style } = this.drag.node;
			this.dragStart = {
				x: style.left ? parseInt(style.left.split("px")[0]) : 0,
				y: style.top ? parseInt(style.top.split("px")[0]) : 0
			};
		});

		this.dragPoint.drag((dx, dy) => {
			const { style } = this.drag.node;
			const ratio = this.svgBBox.width/this.svgBBox.height;
			let width;let height;
			if(dy*ratio<dx){
				width =  Math.max(dx + this.dragStartBBox.width, 10);
				height = width/ratio;
			}else{
				height = Math.max(dy + this.dragStartBBox.height, 10);
				width = height*ratio;
			}
			this.drag.node.style.width = width;
			this.drag.node.style.height = height;
			const left =  style.left ? parseInt(style.left.split("px")[0]) : 0;
			const top =  style.top ? parseInt(style.top.split("px")[0]) : 0;
			controller.transform(
				this.svgBBox.width/(width* this.scale),
				-(left-this.padding)*this.scale,
				-(top-this.padding)*this.scale,
			)
		}, (x, y, e) => {
			e.preventDefault();
			e.stopPropagation()
			this.dragStartBBox = this.drag.node.getBoundingClientRect();
			return false;
		});
		this.editor.on("change", this.render);
		this.editor.on("panning",this.resetDrag);
		this.editor.on("zoom",this.resetDrag);
	}

	resetDrag=()=>{
		const transform = this.editor.paper.transform();
		const { dx, dy,scalex } = transform.localMatrix.split();
		const x = dx*scalex;
		const y = dy*scalex;
		this.drag.node.style.left = this.padding-x/this.scale;
		this.drag.node.style.top = this.padding-y/this.scale;
	}

	render = () => {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(async () => {
			const node = this.editor.svg.node;
			const transform = this.editor.paper.transform();
			const { dx, dy } = transform.localMatrix.split();
			const svgBBox = node.getBoundingClientRect();
			const images = node.querySelectorAll("image")||[];
			images.forEach(img=>{
				img.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
			})
			const svg = node.innerHTML.replace(/\"mm-editor-paper\" transform=\"matrix\([-\d\,]+\)\"/,`"mm-editor-paper" `)
			const m = new Snap.Matrix();
			m.translate(this.padding,this.padding);
			m.scale(1 / this.scale);
			// m.translate(this.dx,this.dy);

			this.svgBBox = svgBBox;			
			this.dragBBox={
				width:svgBBox.width / this.scale ,
				height:svgBBox.height / this.scale
			}
			this.drag.node.style.width = this.dragBBox.width + "px";
			this.drag.node.style.height = this.dragBBox.height + "px";
			this.converting = await Canvg.fromString(this.ctx, `<g transform="${m.toString()}" class="minimap-graph">${svg}</g>`,{
				// offsetX:10,
				// offsetY:10
			});
			this.converting.start();
		}, 200)
	}

	destroy() {
		clearTimeout(this.timeout);
		this.editor.off("change", this.render);
		this.editor.off("panning",this.render);
		this.editor.off("zoom",this.render);
		this.drag.unDrag();
		this.dragPoint.unDrag();
	}
}
export default MiniMap;