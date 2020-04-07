import { getCoordinateAt } from "./Helper";

export default class Tile {
    constructor(image, tileSize, id, pos, data) {
        this.image = image;
        this.tileSize = tileSize;
        this.id = id;
        this.pos = pos;
        this.data = data;
    }

    isTileOnScreen(container, grid) {
        const { x, y } = this.pos;
        let topLeft = {
            x: 0,
            y: 0,
        };
        let bottomRight = {
            x: container.width,
            y: container.height,
        };

        topLeft = getCoordinateAt(topLeft, grid);
        bottomRight = getCoordinateAt(bottomRight, grid);

        topLeft.x += -1;
        topLeft.y += -1;
        bottomRight.x -= -1;
        bottomRight.y -= -1;

        if (x < topLeft.x || x > bottomRight.x || y < topLeft.y || y > bottomRight.y) return false;
        return true;
    }

    update() {}

    render({ container, grid }) {
        const context = container.canvas.getContext("2d");
        const offset = grid.offset;

        if (!this.isTileOnScreen(container, grid)) return;

        context.drawImage(
            this.image,
            offset.x + this.pos.x * grid.size,
            offset.y + this.pos.y * grid.size,
            grid.size,
            grid.size,
        );
    }
}

export class Autotile extends Tile {
    constructor(source, sourceJSON) {
        super(source, { x: 0, y: 0 });
        const { tileSize, autor, type, content } = JSON.parse(sourceJSON);

        this.autotileID = 0;
        this.tilesetID = -1; // not implemented

        this.source = source;
        this.pos = pos;
        this.active = false;

        this.image = new Image();
        this.image.src = this.source;
    }

    render(state) {
        const context = state.container.canvas.getContext("2d");
        const grid = state.grid;
        const offset = grid.offset;

        if (!this.isTileOnScreen(state)) return;

        context.drawImage(
            this.image,
            offset.x + this.pos.x * grid.size,
            offset.y + this.pos.y * grid.size,
            grid.size,
            grid.size,
        );
    }
}
