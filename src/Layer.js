import { GridTile } from "./Tile";

export class Layer {
    constructor(name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.layout = Layer.initLayout(width, height);
        this.active = true;
    }

    setAt(tile, x, y) {
        if (this.isMouseOnLayer(x, y)) this.layout[x][y] = tile;
    }

    getAt(x, y) {
        return this.layout[x][y];
    }

    removeAt(x, y) {
        if (this.isMouseOnLayer(x, y) && this.layout[x][y] !== null) {
            this.layout[x][y].destroy();
            this.layout[x][y] = null;
        }
    }

    isMouseOnLayer(x, y) {
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    }

    destroy() {
        this.delete = true;
    }

    render(state) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.layout[x][y] !== null) this.layout[x][y].render(state);
            }
        }
    }

    static initLayout(width, height) {
        let layout;
        layout = new Array(width);
        for (let x = 0; x < layout.length; x++) {
            layout[x] = new Array(height);
            for (let y = 0; y < layout[x].length; y++) {
                layout[x][y] = null;
            }
        }
        return layout;
    }

    static getCurrent(layers) {
        for (let i = 0; i < layers.length; i++) if (layers[i].active) return layers[i];
    }
}

export class Grid extends Layer {
    constructor(width, height) {
        super("Grid", width, height);
        this.layout = Grid.initGrid(width, height);
        this.active = false;
    }

    static initGrid(width, height) {
        let grid;
        grid = new Array(width);
        for (let x = 0; x < grid.length; x++) {
            grid[x] = new Array(height);
            for (let y = 0; y < grid[x].length; y++) {
                grid[x][y] = new GridTile(false, x, y);
            }
        }
        return grid;
    }
}
