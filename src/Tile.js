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
    constructor(useDot, x, y) {
        super(null, x, y);
        this.useDot = useDot;
    }

    render(state) {
        const context = state.container.canvas.getContext("2d");
        const grid = state.grid;
        const offset = grid.offset;

        if (this.useDot) {
            context.beginPath();
            context.fillStyle = "grey";
            context.arc(
                offset.x + this.x * grid.size,
                offset.y + this.y * grid.size,
                (grid.size * grid.dotSize) / 2,
                0,
                2 * Math.PI,
                false,
            );
            context.globalAlpha = 0.3;
            context.fill();
            context.globalAlpha = 1;
        } else {
            //TODO : make a real cross cause center darker
            context.fillStyle = "grey";
            context.globalAlpha = 0.3;
            context.fillRect(
                offset.x + this.x * grid.size - 0.5 * grid.size,
                offset.y + this.y * grid.size - 0.5 * grid.size + grid.size * (0.5 - 0.07 / 2),
                grid.size,
                grid.size * 0.07,
            );
            context.fillRect(
                offset.x + this.x * grid.size - 0.5 * grid.size + grid.size * (0.5 - 0.07 / 2),
                offset.y + this.y * grid.size - 0.5 * grid.size,
                grid.size * 0.07,
                grid.size,
            );
            context.globalAlpha = 1;
        }
    }
}
