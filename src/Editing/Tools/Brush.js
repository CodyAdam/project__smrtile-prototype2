import { Layer } from "../Layer";
import { getCoordinateAt, getMouseInCanvas } from "../Helper";

export default class Brush {
	constructor(size) {
		this.active = true;
		this.object = null;
		this.size = 1;
		this.click = { left: false, right: false };
		this.lastMouse = { x: null, y: null };
		this.propeties = {
			size: {
				name: "Size",
				type: "number",
				set: this.setSize
			}
		};
	}

	setSize(value) {
		this.size = value;
	}

	onMouseDown(e, state, layers) {
		const mousePos = getMouseInCanvas({ x: e.pageX, y: e.pageY }, state.container);
		const coordinateAtMouse = getCoordinateAt(mousePos, state.grid);
		if (Layer.getActive(layers).visible) {
			if (e.which === 1) {
				this.click.left = true;
				this.placeAt(coordinateAtMouse, layers);
			} else if (e.which === 3) {
				this.click.right = true;
				this.eraseAt(coordinateAtMouse, layers);
			}
		}
		this.lastMouse = { x: e.pageX, y: e.pageY };
	}

	onMouseUp(e) {
		if (e.which === 1) this.click.left = false;
		if (e.which === 3) this.click.right = false;
	}

	placeAt(pos, layers) {
		if (this.object === null) return;
		const { x, y } = pos;
		const s = this.size;
		let squarePos = {};

		if (s % 2 === 0) {
			const center = { x: Math.round(x), y: Math.round(y) };
			squarePos = { x: center.x - s / 2, y: center.y - s / 2 };
		} else {
			const center = { x: Math.floor(x), y: Math.floor(y) };
			squarePos = { x: center.x - s / 2 + 1, y: center.y - s / 2 + 1 };
		}
		for (let offsetX = 0; offsetX < s; offsetX++) {
			for (let offsetY = 0; offsetY < s; offsetY++) {
				Layer.getActive(layers).set([
					{
						x: Math.floor(squarePos.x) + offsetX,
						y: Math.floor(squarePos.y) + offsetY,
						object: this.object
					}
				]);
			}
		}
	}

	eraseAt(pos, layers) {
		if (this.object === null) return;
		const { x, y } = pos;
		const s = this.size;
		let squarePos = {};

		if (s % 2 === 0) {
			const center = { x: Math.round(x), y: Math.round(y) };
			squarePos = { x: center.x - s / 2, y: center.y - s / 2 };
		} else {
			const center = { x: Math.floor(x), y: Math.floor(y) };
			squarePos = { x: center.x - s / 2 + 1, y: center.y - s / 2 + 1 };
		}
		for (let offsetX = 0; offsetX < s; offsetX++) {
			for (let offsetY = 0; offsetY < s; offsetY++) {
				Layer.getActive(layers).set([
					{
						x: Math.floor(squarePos.x) + offsetX,
						y: Math.floor(squarePos.y) + offsetY,
						object: null
					}
				]);
			}
		}
	}

	onMouseMove(e, state, layers) {
		let grid = state.grid;
		const mousePos = getMouseInCanvas({ x: e.pageX, y: e.pageY }, state.container);
		const lastCoordinateAtMouse = getCoordinateAt(
			getMouseInCanvas(this.lastMouse, state.container),
			grid
		);
		const coordinateAtMouse = getCoordinateAt(mousePos, grid);

		if (this.click.left) {
			this.makeLine(lastCoordinateAtMouse, coordinateAtMouse, layers, true);
			this.lastMouse = { x: e.pageX, y: e.pageY };
			return true;
		} else if (this.click.right) {
			this.makeLine(lastCoordinateAtMouse, coordinateAtMouse, layers, false);
			this.lastMouse = { x: e.pageX, y: e.pageY };
			return true;
		}
		return false;
	}

	onMouseLeave() {
		this.click.left = false;
		this.click.right = false;
	}

	makeLine(start, end, layers, isPlacing) {
		var difX = end.x - start.x;
		var difY = end.y - start.y;
		var dist = Math.abs(difX) + Math.abs(difY);
		if (dist < 0.5) {
			if (isPlacing) this.placeAt({ x: start.x, y: start.y }, layers);
			else this.eraseAt({ x: start.x, y: start.y }, layers);
			return;
		}

		var dx = difX / dist;
		var dy = difY / dist;

		for (var i = 0, x, y; i <= Math.ceil(dist); i++) {
			x = start.x + dx * i;
			y = start.y + dy * i;
			if (isPlacing) this.placeAt({ x: x, y: y }, layers);
			else this.eraseAt({ x: x, y: y }, layers);
		}
	}
}
