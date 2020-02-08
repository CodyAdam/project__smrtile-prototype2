import React from "react";
import tileImg from "./assets/tileset/test.png";
import { getCoordinateAt, getMouseInCanvas } from "./EditingFunctions";
import { Layer, Grid } from "./Layer";
import Tile from "./Tile";

class EditingArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            container: {
                div: 1,
                canvas: 1,
                width: 0,
                height: 0,
                offset: { x: 0, y: 0 },
            },
            grid: {
                size: 50,
                minSize: 3,
                maxSize: 300,
                dotSize: 0.14,
                useDotGrid: false,
                offset: { x: 0, y: 0 },
            },
            map: {
                width: 6,
                height: 4,
            },
            actions: {
                isPanning: false,
                isPlacing: false,
                isErasing: false,
            },
            img: { tile: new Image() },
            lastMousePos: { x: 0, y: 0 },
        };

        this.layers = [
            new Layer("layer 1", this.state.map.width, this.state.map.height),
            new Grid(true, this.state.map.width, this.state.map.height),
        ];
    }

    componentDidMount() {
        const canvas = this.refs.canvas;

        window.addEventListener("resize", this.handleResize.bind(this));
        canvas.addEventListener("wheel", this.handleWheel.bind(this));
        canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
        canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
        canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
        canvas.addEventListener("mouseleave", this.handleMouseLeave.bind(this));

        //disable right click menu
        document.oncontextmenu = function() {
            return false;
        };

        let container = this.state.container;
        container.canvas = canvas;
        container.div = this.refs.div;
        this.setState({ container: container });

        this.handleResize();
        this.onStart();
    }

    onStart() {
        let map = this.state.map;
        let img = this.state.img;
        let grid = this.state.grid;
        const div = this.refs.div;

        img.tile.src = tileImg;

        grid.offset = {
            x: Math.round(div.offsetWidth / 2 - (map.width * this.state.grid.size) / 2),
            y: Math.round(div.offsetHeight / 2 - (map.height * this.state.grid.size) / 2),
        };
        this.setState({
            grid: grid,
            img: img,
        });
    }

    componentDidUpdate() {
        const container = this.state.container;
        const context = this.refs.canvas.getContext("2d");
        //Clear canvas

        context.clearRect(0, 0, container.width, container.height);
        this.updateLayers();
    }

    updateLayers() {
        for (let i = 0; i < this.layers.length; i++) {
            if (this.layers[i].delete) this.layers.splice(i, 1);
            else this.layers[i].render(this.state);
        }
    }

    handleResize() {
        const div = this.refs.div;
        const w = div.offsetWidth;
        const h = div.offsetHeight;
        const containerOffset = { x: div.offsetLeft, y: div.offsetTop };

        let container = this.state.container;
        container.width = w;
        container.height = h;
        container.offset = containerOffset;

        this.setState({
            container: container,
        });
        const canvas = this.refs.canvas;
        canvas.width = w;
        canvas.height = h;
    }

    handleWheel(e) {
        const SCROLL_SENSIVITY = 0.1;

        const container = this.state.container;
        const lastMousePos = this.state.lastMousePos;
        let offset = this.state.grid.offset;
        let grid = this.state.grid;
        const scrollValue = 1 - Math.sign(e.deltaY) * SCROLL_SENSIVITY;
        const before = {
            x: lastMousePos.x - offset.x - container.offset.x,
            y: lastMousePos.y - offset.y - container.offset.y,
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
        this.setState({ grid: grid });
    }

    handleMouseUp(e) {
        let actions = this.state.actions;
        if (e.which === 1) actions.isPlacing = false;
        if (e.which === 2) actions.isPanning = false;
        if (e.which === 3) actions.isErasing = false;
        this.setState({ actions: actions });
    }

    handleMouseLeave() {
        let actions = this.state.actions;
        actions.isPlacing = false;
        actions.isPanning = false;
        actions.isErasing = false;
        this.setState({ actions: actions });
    }

    handleMouseDown(e) {
        let actions = this.state.actions;
        let toPlace = null;
        const mousePos = getMouseInCanvas({ x: e.pageX, y: e.pageY }, this.state.container);
        const TileCoordinateAtMousePos = getCoordinateAt(mousePos, this.state.grid);
        if (e.which === 1) {
            actions.isPlacing = true;
            Layer.getCurrent(this.layers).setAt(
                new Tile(this.state.img.tile, TileCoordinateAtMousePos.x, TileCoordinateAtMousePos.y),
                TileCoordinateAtMousePos.x,
                TileCoordinateAtMousePos.y,
            );
            //toPlace = true;
        } else if (e.which === 2) {
            actions.isPanning = true;
        } else if (e.which === 3) {
            actions.isErasing = true;
            Layer.getCurrent(this.layers).removeAt(TileCoordinateAtMousePos.x, TileCoordinateAtMousePos.y);
            //toPlace = false;
        }
        this.setState({ actions: actions, lastMousePos: { x: e.pageX, y: e.pageY } }, () => {
            if (toPlace != null) this.setAtCoordinate(toPlace, TileCoordinateAtMousePos);
        });
    }

    handleMouseMove(e) {
        const actions = this.state.actions;
        const lastMousePos = this.state.lastMousePos;
        const container = this.state.container;
        const map = this.state.map;
        let grid = this.state.grid;
        const mousePos = getMouseInCanvas({ x: e.pageX, y: e.pageY }, container);
        const TileCoordinateAtMousePos = getCoordinateAt(mousePos, grid);

        if (actions.isPanning) {
            if (
                grid.offset.x - (lastMousePos.x - e.pageX) > container.width ||
                grid.offset.x - (lastMousePos.x - e.pageX) < map.width * -grid.size ||
                grid.offset.y - (lastMousePos.y - e.pageY) > container.height ||
                grid.offset.y - (lastMousePos.y - e.pageY) < map.height * -grid.size
            ) {
                return;
            } else {
                grid.offset.x -= lastMousePos.x - e.pageX;
                grid.offset.y -= lastMousePos.y - e.pageY;
                this.setState({ grid: grid });
            }
        } else if (actions.isPlacing) {
            Layer.getCurrent(this.layers).setAt(
                new Tile(this.state.img.tile, TileCoordinateAtMousePos.x, TileCoordinateAtMousePos.y),
                TileCoordinateAtMousePos.x,
                TileCoordinateAtMousePos.y,
            );
            //this.setAtCoordinate(true, TileCoordinateAtMousePos);
        } else if (actions.isErasing) {
            Layer.getCurrent(this.layers).removeAt(TileCoordinateAtMousePos.x, TileCoordinateAtMousePos.y);
            //this.setAtCoordinate(false, TileCoordinateAtMousePos);
        }

        this.setState({ lastMousePos: { x: e.pageX, y: e.pageY } });
    }

    render() {
        return (
            <div id="EditingArea" ref="div">
                <canvas ref="canvas"></canvas>
                {/* <input type="checkbox" id="useDot" ref={this.input} name="useDot" checked /> */}
            </div>
        );
    }
}

export default EditingArea;
