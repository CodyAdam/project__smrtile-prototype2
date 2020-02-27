import { getCoordinateAt } from "./Helper";

export default class Tile {
    constructor(source, pos, relative) {
        this.source = source;
        this.pos = pos;
        this.active = false;
        this.relative = relative;

        this.image = new Image();
        this.image.src = this.source;
    }

    static isTileOnScreen(x, y, state) {
        let topLeft = {
            x: 0,
            y: 0,
        };
        let bottomRight = {
            x: state.container.width,
            y: state.container.height,
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
    render(state) {
        const context = state.container.canvas.getContext("2d");
        const grid = state.grid;
        const offset = grid.offset;

        if (!Tile.isTileOnScreen(this.pos.x, this.pos.y, state)) return;

        context.drawImage(
            this.image,
            offset.x + this.pos.x * grid.size,
            offset.y + this.pos.y * grid.size,
            grid.size,
            grid.size,
        );
    }
}
