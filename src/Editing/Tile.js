export default class Tile {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    destroy() {
        this.delete = true;
    }

    render(state) {
        const context = state.container.canvas.getContext("2d");
        const grid = state.grid;
        const offset = grid.offset;

        context.drawImage(
            this.sprite,
            offset.x + this.x * grid.size,
            offset.y + this.y * grid.size,
            grid.size,
            grid.size,
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

        if (this.useDot) {
            context.beginPath();
            context.fillStyle = this.color;
            context.arc(
                offset.x + this.x * grid.size,
                offset.y + this.y * grid.size,
                (grid.size * this.dotSize) / 2,
                0,
                2 * Math.PI,
                false,
            );
            context.globalAlpha = this.opacity;
            context.fill();
            context.globalAlpha = 1;
        } else {
            //TODO : make a real cross
            context.fillStyle = this.color;
            context.globalAlpha = this.opacity;
            context.fillRect(
                offset.x + this.x * grid.size - 0.5 * grid.size,
                offset.y + this.y * grid.size - 0.5 * grid.size + grid.size * (0.5 - this.crossSize / 2),
                grid.size,
                grid.size * this.crossSize,
            );
            context.fillRect(
                offset.x + this.x * grid.size - 0.5 * grid.size + grid.size * (0.5 - this.crossSize / 2),
                offset.y + this.y * grid.size - 0.5 * grid.size,
                grid.size * this.crossSize,
                grid.size,
            );
            context.globalAlpha = 1;
        }
    }
}
