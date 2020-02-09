import Tile from "../Tile";
import { Layer } from "../Layer";
import { getCoordinateAt, getMouseInCanvas } from "../Helper";

export default class Brush {
    constructor(size, sprite) {
        this.active = false;
        this.size = size;
        this.sprite = sprite;
        this.click = { left: false, right: false };
        this.lastMouse = { x: null, y: null };
    }

    onMouseDown(e, state, layers) {
        const mousePos = getMouseInCanvas({ x: e.pageX, y: e.pageY }, state.container);
        const coordinateAtMouse = getCoordinateAt(mousePos, state.grid);

        if (e.which === 1) {
            this.click.left = true;
            Layer.getActive(layers).setAt(
                new Tile(this.sprite, coordinateAtMouse.x, coordinateAtMouse.y),
                coordinateAtMouse.x,
                coordinateAtMouse.y,
            );
        } else if (e.which === 3) {
            this.click.right = true;
            Layer.getActive(layers).removeAt(coordinateAtMouse.x, coordinateAtMouse.y);
        }
    }

    onMouseUp(e) {
        if (e.which === 1) this.click.left = false;
        if (e.which === 3) this.click.right = false;
    }

    onMouseMove(e, state, layers) {
        let grid = state.grid;
        const mousePos = getMouseInCanvas({ x: e.pageX, y: e.pageY }, state.container);
        const CoordinateAtMouse = getCoordinateAt(mousePos, grid);

        if (this.click.left) {
            Layer.getActive(layers).setAt(
                new Tile(this.sprite, CoordinateAtMouse.x, CoordinateAtMouse.y),
                CoordinateAtMouse.x,
                CoordinateAtMouse.y,
            );
        } else if (this.click.right) {
            Layer.getActive(layers).removeAt(CoordinateAtMouse.x, CoordinateAtMouse.y);
        }

        this.lastMouse = { x: e.pageX, y: e.pageY };
    }

    onMouseLeave() {
        this.click.left = false;
        this.click.right = false;
    }
}
