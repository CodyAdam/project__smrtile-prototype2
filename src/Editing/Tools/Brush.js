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
            this.placeAt(coordinateAtMouse, layers);
        } else if (e.which === 3) {
            this.click.right = true;
            this.eraseAt(coordinateAtMouse, layers);
        }
        this.lastMouse = { x: e.pageX, y: e.pageY };
    }

    onMouseUp(e) {
        if (e.which === 1) this.click.left = false;
        if (e.which === 3) this.click.right = false;
    }

    placeAt(pos, layers) {
        Layer.getActive(layers).setAt(new Tile(this.sprite, pos.x, pos.y), pos.x, pos.y);
    }

    eraseAt(pos, layers) {
        Layer.getActive(layers).removeAt(pos.x, pos.y);
    }

    onMouseMove(e, state, layers) {
        let grid = state.grid;
        const mousePos = getMouseInCanvas({ x: e.pageX, y: e.pageY }, state.container);
        const coordinateAtMouse = getCoordinateAt(mousePos, grid);

        if (this.click.left) {
            this.verifyLine(
                getCoordinateAt(getMouseInCanvas(this.lastMouse, state.container), grid),
                coordinateAtMouse,
                layers,
            );
        } else if (this.click.right) {
            this.eraseAt(coordinateAtMouse, layers);
        }

        this.lastMouse = { x: e.pageX, y: e.pageY };
    }

    onMouseLeave() {
        this.click.left = false;
        this.click.right = false;
    }

    verifyLine(start, end, layers) {
        var difX = end.x - start.x;
        var difY = end.y - start.y;
        var dist = Math.abs(difX) + Math.abs(difY);
        if (dist < 0.5) {
            this.placeAt({ x: Math.floor(start.x), y: Math.floor(start.y) }, layers);
            return;
        }

        var dx = difX / dist;
        var dy = difY / dist;

        for (var i = 0, x, y; i <= Math.ceil(dist); i++) {
            x = Math.floor(start.x + dx * i);
            y = Math.floor(start.y + dy * i);
            this.placeAt({ x: x, y: y }, layers);
        }
    }
}
