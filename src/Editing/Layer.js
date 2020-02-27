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

    set(points) {
        points.forEach((point) => {
            const { x, y, object } = point;
            if (this.isOnLayer(x, y) && object !== null)
                this.layout[x][y] = new Tile(object.source, { x: x, y: y }, object.relative);
            else if (this.isOnLayer(x, y)) this.layout[x][y] = null;
        });
    }

    get(points) {
        let result = [];
        points.forEach((point) => {
            const { x, y } = point;
            result.push(this.layout[x][y]);
        });
        return result;
    }

    isOnLayer(x, y) {
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
