import React from "react";
import Grid from "./Grid";

export default class EditingArea extends React.Component {
    constructor(props) {
        super(props);
        this.handleResize = this.handleResize.bind(this);
        this.handleWheel = this.handleWheel.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.setGrid = this.setGrid.bind(this);
        this.state = {
            container: {
                div: null,
                canvas: null,
                width: null,
                height: null,
                offset: { x: null, y: null },
            },
            grid: {
                size: 25,
                minSize: 1,
                maxSize: 300,
                offset: { x: 0, y: 0 },
            },
            map: this.props.map,
            layers: props.layers,
        };
    }

    setGrid(newGrid) {
        this.setState({ grid: newGrid });
    }

    componentDidMount() {
        const { canvas, div } = this.refs;

        window.addEventListener("resize", this.handleResize);
        canvas.addEventListener("wheel", this.handleWheel);
        canvas.addEventListener("mousedown", this.handleMouseDown);
        canvas.addEventListener("mousemove", this.handleMouseMove);
        canvas.addEventListener("mouseup", this.handleMouseUp);
        canvas.addEventListener("mouseleave", this.handleMouseLeave);

        let container = this.state.container;
        container.canvas = canvas;
        container.div = this.refs.div;
        this.setState({ container: container });

        this.handleResize();

        let { map, grid } = this.state;
        grid.offset = {
            x: Math.round(div.offsetWidth / 2 - (map.width * this.state.grid.size) / 2),
            y: Math.round(div.offsetHeight / 2 - (map.height * this.state.grid.size) / 2),
        };
        this.setState({
            grid: grid,
        });
    }

    componentDidUpdate() {
        this.updateLayers();
    }

    updateLayers() {
        const { container, layers } = this.state;
        const context = container.canvas.getContext("2d");

        context.clearRect(0, 0, container.width, container.height);
        if (layers.length > 0)
            for (let i = layers.length - 1; i >= 0; i--) {
                if (layers[i].delete) layers.splice(i, 1);
                else layers[i].render(this.state);
            }
    }

    handleResize() {
        const { canvas, div } = this.refs;
        const w = div.offsetWidth;
        const h = div.offsetHeight;

        let container = this.state.container;
        container.width = w;
        container.height = h;
        container.offset = { x: div.offsetLeft, y: div.offsetTop };
        this.setState({
            container: container,
        });

        canvas.width = w;
        canvas.height = h;
        this.updateLayers();
    }

    handleWheel(e) {
        const tools = this.props.tools;
        tools.camera.onWheel(e, this.state, this.setGrid);
        this.updateLayers();
    }

    handleMouseLeave() {
        const tools = this.props.tools;
        tools.getActive().onMouseLeave();
        tools.camera.onMouseLeave();
    }

    handleMouseDown(e) {
        const tools = this.props.tools;
        e.preventDefault();
        if (e.which === 2) tools.camera.onMouseDown(e);
        else tools.getActive().onMouseDown(e, this.state, this.state.layers);
        this.updateLayers();
    }

    handleMouseUp(e) {
        const tools = this.props.tools;
        tools.getActive().onMouseUp(e);
        tools.camera.onMouseUp(e);
    }

    handleMouseMove(e) {
        const tools = this.props.tools;
        if (
            tools.getActive().onMouseMove(e, this.state, this.state.layers) ||
            tools.camera.onMouseMove(e, this.state, this.setGrid)
        )
            this.updateLayers();
    }

    render() {
        return (
            <div id="EditingArea" ref="div">
                <canvas ref="canvas"></canvas>
                <Grid grid={this.state.grid} container={this.state.container} map={this.state.map} />
            </div>
        );
    }
}
