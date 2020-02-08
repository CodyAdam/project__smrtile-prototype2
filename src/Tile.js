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
        const context = this.refs.canvas.getContext("2d");
        const grid = state.grid;
        const offset = grid.offset;

        for (let x = 0; x < map.width; x++) {
            for (let y = 0; y < map.height; y++) {
                if (map.layout[x][y] === true) {
                    context.drawImage(
                        this.state.img.tile,
                        offset.x + x * grid.size,
                        offset.y + y * grid.size,
                        grid.size,
                        grid.size,
                    );
                }
            }
        }
    }
}
