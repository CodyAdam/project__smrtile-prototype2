import Tile from "./Tile";

export class Layer {
    constructor(name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.layout = Layer.initLayout(width, height);
        this.active = false;
        this.visible = true;
    }

    setAt(object, pos) {
        if (this.isCoordinateOnLayer(pos.x, pos.y))
            this.layout[pos.x][pos.y] = new Tile(object.source, pos, object.relative);
    }

    getAt(x, y) {
        return this.layout[x][y];
    }

    eraseAt(x, y) {
        if (this.isCoordinateOnLayer(x, y) && this.layout[x][y] !== null) {
            this.layout[x][y].destroy();
            this.layout[x][y] = null;
        }
    }

    isCoordinateOnLayer(x, y) {
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    }

    destroy() {
        this.delete = true;
    }

    render(state) {
        if (this.visible)
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

    static getActive(layers) {
        for (let i = 0; i < layers.length; i++) if (layers[i].active) return layers[i];
    }
}
