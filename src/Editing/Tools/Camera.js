export default class Camera {
    constructor() {
        this.active = false;
        this.click = { left: false, middle: false, right: false };
        this.lastMouse = { x: null, y: null };
        this.scrollSensivity = 0.1;
    }

    onMouseDown(e) {
        if (e.which === 1) this.click.left = true;
        else if (e.which === 2) this.click.middle = true;
        else if (e.which === 3) this.click.right = true;
        this.lastMouse = { x: e.pageX, y: e.pageY };
    }

    onMouseUp(e) {
        if (e.which === 1) this.click.left = false;
        if (e.which === 2) this.click.middle = false;
        if (e.which === 3) this.click.right = false;
        this.lastMouse = { x: e.pageX, y: e.pageY };
    }

    onMouseMove(e, state, setState) {
        let grid = state.grid;
        const map = state.map;
        const container = state.container;
        const lastMouse = this.lastMouse;

        if (this.click.middle) {
            if (
                grid.offset.x - (lastMouse.x - e.pageX) > container.width ||
                grid.offset.x - (lastMouse.x - e.pageX) < map.width * -grid.size ||
                grid.offset.y - (lastMouse.y - e.pageY) > container.height ||
                grid.offset.y - (lastMouse.y - e.pageY) < map.height * -grid.size
            ) {
                return;
            } else {
                grid.offset.x -= lastMouse.x - e.pageX;
                grid.offset.y -= lastMouse.y - e.pageY;

                this.lastMouse = { x: e.pageX, y: e.pageY };

                setState({ grid: grid });
            }
        } else if (this.click.left && this.ative) {
            //TODO Do somethings
        } else if (this.click.right && this.ative) {
            //TODO Do somethings
        }
    }

    onMouseLeave() {
        this.click.left = false;
        this.click.middle = false;
        this.click.right = false;
    }

    onWheel(e, state, setState) {
        const container = state.container;
        const mouse = { x: e.pageX, y: e.pageY };
        let grid = state.grid;
        let offset = grid.offset;
        const scrollValue = 1 - Math.sign(e.deltaY) * this.scrollSensivity;

        const before = {
            x: mouse.x - offset.x - container.offset.x,
            y: mouse.y - offset.y - container.offset.y,
            gSize: grid.size,
        };

        if (Math.round(grid.size * scrollValue) < grid.minSize) grid.size = grid.minSize;
        else if (Math.round(grid.size * scrollValue) > grid.maxSize) grid.size = grid.maxSize;
        else grid.size = Math.round(grid.size * scrollValue);

        const after = {
            xDif: (before.x * grid.size) / before.gSize,
            yDif: (before.y * grid.size) / before.gSize,
            gsize: grid.size,
        };

        offset.x += Math.round(before.x - after.xDif);
        offset.y += Math.round(before.y - after.yDif);
        grid.offset = offset;
        setState({ grid: grid });
    }
}
