import Tile from "../Tile";
import { Layer } from "../Layer";
import { getCoordinateAt, getMouseInCanvas } from "../Helper";

export default class Brush {
    constructor(size, sprite) {
        this.active = false;
        this.size = size;
        this.sprite = sprite;
        this.click = { left: false, middle: false, right: false };
    }

    onMouseDown(e, state, layers) {
        const mousePos = getMouseInCanvas({ x: e.pageX, y: e.pageY }, state.container);
        const TileCoordinateAtMousePos = getCoordinateAt(mousePos, state.grid);
        if (e.which === 1) {
            this.click.left = true;
            Layer.getActive(layers).setAt(
                new Tile(this.sprite, TileCoordinateAtMousePos.x, TileCoordinateAtMousePos.y),
                TileCoordinateAtMousePos.x,
                TileCoordinateAtMousePos.y,
            );
        } else if (e.which === 2) {
            this.click.middle = true;
        } else if (e.which === 3) {
            this.click.right = true;
            Layer.getActive(layers).removeAt(TileCoordinateAtMousePos.x, TileCoordinateAtMousePos.y);
        }
    }

    onMouseUp() {}

    onMouseMove() {}

    onMouseLeave() {}
}
