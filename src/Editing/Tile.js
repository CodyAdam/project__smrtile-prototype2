import { getCoordinateAt } from "./Helper";

export default class Tile {
	constructor(sprite, x, y) {
		this.sprite = sprite;
		this.x = x;
		this.y = y;
	}

	static isTileOnScreen(x, y, state) {
		let topLeft = {
			x: 0,
			y: 0
		};
		let bottomRight = {
			x: state.container.width,
			y: state.container.height
		};

		topLeft = getCoordinateAt(topLeft, state.grid);
		bottomRight = getCoordinateAt(bottomRight, state.grid);

		topLeft.x += -1;
		topLeft.y += -1;
		bottomRight.x -= -1;
		bottomRight.y -= -1;

		if (x < topLeft.x || x > bottomRight.x || y < topLeft.y || y > bottomRight.y) return false;
		return true;
	}

	destroy() {
		this.delete = true;
	}

	render(state) {
		const context = state.container.canvas.getContext("2d");
		const grid = state.grid;
		const offset = grid.offset;

		if (!Tile.isTileOnScreen(this.x, this.y, state)) return;

		context.drawImage(
			this.sprite,
			offset.x + this.x * grid.size,
			offset.y + this.y * grid.size,
			grid.size,
			grid.size
		);
	}
}

export class GridTile extends Tile {
	constructor(x, y) {
		super(null, x, y);
		this.useDot = null;
		this.dotSize = null;
		this.crossSize = null;
		this.opacity = null;
		this.color = null;
	}

	render(state) {
		const context = state.container.canvas.getContext("2d");
		const grid = state.grid;
		const offset = grid.offset;

		if (!Tile.isTileOnScreen(this.x, this.y, state)) return;
		if (this.useDot) {
			context.beginPath();
			context.fillStyle = this.color;
			context.arc(
				offset.x + this.x * grid.size,
				offset.y + this.y * grid.size,
				(grid.size * this.dotSize) / 2,
				0,
				2 * Math.PI,
				false
			);
			context.globalAlpha = this.opacity;
			context.fill();
			context.globalAlpha = 1;
		} else {
			context.fillStyle = this.color;
			context.globalAlpha = this.opacity;
			context.fillRect(
				offset.x + grid.size * (this.x - 0.5),
				offset.y + grid.size * (this.y - 0.5 + (0.5 - this.crossSize / 2)),
				grid.size,
				grid.size * this.crossSize
			);
			context.fillRect(
				offset.x + grid.size * (this.x - 0.5 + (0.5 - this.crossSize / 2)),
				offset.y + grid.size * (this.y - 0.5),
				grid.size * this.crossSize,
				grid.size * (0.5 - this.crossSize * 0.5)
			);
			context.fillRect(
				offset.x + grid.size * (this.x - 0.5 + (0.5 - this.crossSize / 2)),
				offset.y + grid.size * (this.y + this.crossSize * 0.5),
				grid.size * this.crossSize,
				grid.size * (0.5 - this.crossSize * 0.5)
			);
			context.globalAlpha = 1;
		}
	}
}
