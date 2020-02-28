export default class Camera {
    constructor() {
        this.active = false;
        this.grabbing = false;
        this.lastMouse = { x: null, y: null };
        this.scrollSensivity = 0.1;
        this.propeties = {
            scrollSensivity: {
                name: "Zoom Sensivity",
                type: "number",
                set: this.setScrollSensivity,
            },
        };
    }

    setScrollSensivity(value) {
        this.setScrollSensivity = value;
    }

    onMouseDown(e) {
        this.grabbing = true;
        document.body.style.cursor = "grabbing";
        this.lastMouse = { x: e.pageX, y: e.pageY };
    }

    onMouseUp(e) {
        this.grabbing = false;
        document.body.style.cursor = "default";
        this.lastMouse = { x: e.pageX, y: e.pageY };
    }

    onMouseMove(e, state, setGrid) {
        let grid = state.grid;
        const map = state.map;
        const container = state.container;
        const lastMouse = this.lastMouse;

        if (
            !this.grabbing ||
            grid.offset.x - (lastMouse.x - e.pageX) > container.width ||
            grid.offset.x - (lastMouse.x - e.pageX) < map.width * -grid.size ||
            grid.offset.y - (lastMouse.y - e.pageY) > container.height ||
            grid.offset.y - (lastMouse.y - e.pageY) < map.height * -grid.size
        ) {
            return false;
        } else {
            grid.offset.x -= lastMouse.x - e.pageX;
            grid.offset.y -= lastMouse.y - e.pageY;

            this.lastMouse = { x: e.pageX, y: e.pageY };

            setGrid(grid);
            return true;
        }
    }

    onMouseLeave() {
        this.grabbing = false;
        document.body.style.cursor = "default";
    }

    onWheel(e, state, setGrid) {
        const container = state.container;
        let grid = state.grid;
        let offset = grid.offset;
        const mouse = { x: e.pageX, y: e.pageY };
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
        setGrid(grid);
    }
}
