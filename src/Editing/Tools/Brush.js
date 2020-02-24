import { Layer } from "../Layer";
import { getCoordinateAt, getMouseInCanvas } from "../Helper";

export default class Brush {
    constructor(size) {
        this.active = true;
        this.object = null;
        this.size = 1;
        this.sprite = null;
        this.click = { left: false, right: false };
        this.lastMouse = { x: null, y: null };
    }

    onMouseDown(e, state, layers) {
        const mousePos = getMouseInCanvas({ x: e.pageX, y: e.pageY }, state.container);
        const coordinateAtMouse = getCoordinateAt(mousePos, state.grid);
        if (Layer.getActive(layers).visible) {
            if (e.which === 1) {
                this.click.left = true;
                this.placeAt(coordinateAtMouse, layers);
            } else if (e.which === 3) {
                this.click.right = true;
                this.eraseAt(coordinateAtMouse, layers);
            }
        }
        this.lastMouse = { x: e.pageX, y: e.pageY };
    }

    onMouseUp(e) {
        if (e.which === 1) this.click.left = false;
        if (e.which === 3) this.click.right = false;
    }

    placeAt(pos, layers) {
        if (this.object != null) Layer.getActive(layers).setAt(this.object, pos);
    }

    eraseAt(pos, layers) {
        Layer.getActive(layers).eraseAt(pos.x, pos.y);
    }

    onMouseMove(e, state, layers) {
        let grid = state.grid;
        const mousePos = getMouseInCanvas({ x: e.pageX, y: e.pageY }, state.container);
        const coordinateAtMouse = getCoordinateAt(mousePos, grid);

        if (this.click.left) {
            this.makeLine(
                getCoordinateAt(getMouseInCanvas(this.lastMouse, state.container), grid),
                coordinateAtMouse,
                layers,
                true,
            );
            this.lastMouse = { x: e.pageX, y: e.pageY };
            return true;
        } else if (this.click.right) {
            this.makeLine(
                getCoordinateAt(getMouseInCanvas(this.lastMouse, state.container), grid),
                coordinateAtMouse,
                layers,
                false,
            );
            this.lastMouse = { x: e.pageX, y: e.pageY };
            return true;
        }
        return false;
    }

    onMouseLeave() {
        this.click.left = false;
        this.click.right = false;
    }

    makeLine(start, end, layers, isPlacing) {
        var difX = end.x - start.x;
        var difY = end.y - start.y;
        var dist = Math.abs(difX) + Math.abs(difY);
        if (dist < 0.5) {
            if (isPlacing) this.placeAt({ x: Math.floor(start.x), y: Math.floor(start.y) }, layers);
            else this.eraseAt({ x: Math.floor(start.x), y: Math.floor(start.y) }, layers);
            return;
        }

        var dx = difX / dist;
        var dy = difY / dist;

        for (var i = 0, x, y; i <= Math.ceil(dist); i++) {
            x = Math.floor(start.x + dx * i);
            y = Math.floor(start.y + dy * i);
            if (isPlacing) this.placeAt({ x: x, y: y }, layers);
            else this.eraseAt({ x: x, y: y }, layers);
        }
    }
}
