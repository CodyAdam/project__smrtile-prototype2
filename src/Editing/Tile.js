import { getCoordinateAt } from "./Helper";

export default class Tile {
    constructor(image, tileSize, index, pos, data, columns, rows) {
        this.image = image;
        this.tileSize = tileSize;
        this.index = index;
        this.pos = pos;
        this.data = data;
        this.columns = columns;
        this.rows = rows;
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
        const { image, pos, index, columns, tileSize } = this;
        const context = container.canvas.getContext("2d");
        const offset = grid.offset;

        if (!this.isTileOnScreen(container, grid)) return;

        context.drawImage(
            image,
            offset.x + pos.x * grid.size,
            offset.y + pos.y * grid.size,
            grid.size,
            grid.size,
            ((index % columns) + 1) * tileSize,
            ((index - (index % columns)) / columns) * tileSize,
            tileSize,
            tileSize,
        );
    }
}

export class Autotile extends Tile {
    constructor(image, tileSize, pos, data, columns, rows) {
        super(image, tileSize, 0, pos, data, columns, rows);
    }

    update() {}

    render({ container, grid }) {
        const { image, pos, index, columns, tileSize } = this;
        const context = container.canvas.getContext("2d");
        const offset = grid.offset;

        if (!this.isTileOnScreen(container, grid)) return;

        context.drawImage(
            image,
            offset.x + pos.x * grid.size,
            offset.y + pos.y * grid.size,
            grid.size,
            grid.size,
            ((index % columns) + 1) * tileSize,
            ((index - (index % columns)) / columns) * tileSize,
            tileSize,
            tileSize,
        );
    }
}
