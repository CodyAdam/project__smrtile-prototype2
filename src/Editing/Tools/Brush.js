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
        this.lastMouse = { x: e.pageX, y: e.pageY };
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
            this.verifyLine(
                getCoordinateAt(getMouseInCanvas(this.lastMouse, state.container), grid),
                CoordinateAtMouse,
                (x, y) => {
                    console.log(x + "   " + y);
                    Layer.getActive(layers).setAt(
                        new Tile(this.sprite, CoordinateAtMouse.x, CoordinateAtMouse.y),
                        x,
                        y,
                    );
                },
            );

            //Layer.getActive(layers).setAt(
            //    new Tile(this.sprite, CoordinateAtMouse.x, CoordinateAtMouse.y),
            //    CoordinateAtMouse.x,
            //    CoordinateAtMouse.y,
            //);
        } else if (this.click.right) {
            Layer.getActive(layers).removeAt(CoordinateAtMouse.x, CoordinateAtMouse.y);
        }

        this.lastMouse = { x: e.pageX, y: e.pageY };
    }

    onMouseLeave() {
        this.click.left = false;
        this.click.right = false;
    }

    verifyLine(start, end, action) {
        var difX = end.x - start.x;
        var difY = end.y - start.y;
        var dist = Math.abs(difX) + Math.abs(difY);
        if (dist < 0.5) {
            action(Math.floor(start.x), Math.floor(start.y));
            return;
        }

        var dx = difX / dist;
        var dy = difY / dist;

        for (var i = 0, x, y; i <= Math.ceil(dist); i++) {
            x = Math.floor(start.x + dx * i);
            y = Math.floor(start.y + dy * i);
            action(x, y);
        }
    }
}
