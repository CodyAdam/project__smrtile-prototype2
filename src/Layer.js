export default class Layer {
    layout;

    constructor(name, width, height) {
        this.name = name;
        this.width = width;
        this.height = height;
        layout = initLayout(width, height);
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

    destroy() {
        this.delete = true;
    }

    setTileAt(tile, x, y) {
        //this.layout[x][y] = tile;
        layout[x][y] = tile;
    }

    removeTileAt(x, y) {
        if (layout[x][y] !== null) {
            layout[x][y].destroy();
            layout[x][y] = null;
        }
    }

    render(state) {
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                if (layout[x][y] !== null) layout[x][y].render();
            }
        }
    }
}
