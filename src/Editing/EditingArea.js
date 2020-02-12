import React from "react";
import tileImg from "../assets/tileset/test.png";
import { Layer, Grid } from "./Layer";

import Tool from "./Tools/Tool";
import Camera from "./Tools/Camera";
import Brush from "./Tools/Brush";

class EditingArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			container: {
				div: null,
				canvas: null,
				width: null,
				height: null,
				offset: { x: null, y: null }
			},
			grid: {
				size: 50,
				minSize: 3,
				maxSize: 300,
				offset: { x: 0, y: 0 }
			},
			map: {
				width: 40,
				height: 30
			},
			click: {
				left: false,
				middle: false,
				right: false
			}
		};
		//TODO make the grid as css background
		this.layers = [
			new Grid(this.state.map.width, this.state.map.height),
			new Layer("layer 1", this.state.map.width, this.state.map.height)
		];

		//TODO a changer le system de sprite
		let tile = new Image();
		tile.src = tileImg;
		this.tools = { brush: new Brush(2, tile), camera: new Camera() };
		this.tools.brush.active = true;
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
		let grid = this.state.grid;
		const div = this.refs.div;

		grid.offset = {
			x: Math.round(div.offsetWidth / 2 - (map.width * this.state.grid.size) / 2),
			y: Math.round(div.offsetHeight / 2 - (map.height * this.state.grid.size) / 2)
		};
		this.setState({
			grid: grid
		});
	}

	componentDidUpdate() {
		this.updateLayers();
	}

	updateLayers() {
		const container = this.state.container;
		const context = container.canvas.getContext("2d");

		//Clear canvas
		context.clearRect(0, 0, container.width, container.height);
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
			container: container
		});
		const canvas = this.refs.canvas;
		canvas.width = w;
		canvas.height = h;
		this.updateLayers();
	}

	handleWheel(e) {
		this.tools.camera.onWheel(e, this.state, this.setState.bind(this));
		this.updateLayers();
	}

	handleMouseLeave() {
		Tool.getActive(this.tools).onMouseLeave();
		this.tools.camera.onMouseLeave();
	}

	handleMouseDown(e) {
		Tool.getActive(this.tools).onMouseDown(e, this.state, this.layers);
		this.tools.camera.onMouseDown(e);
		this.updateLayers();
	}
	handleMouseUp(e) {
		Tool.getActive(this.tools).onMouseUp(e);
		this.tools.camera.onMouseUp(e);
	}

	handleMouseMove(e) {
		if (
			Tool.getActive(this.tools).onMouseMove(e, this.state, this.layers) ||
			this.tools.camera.onMouseMove(e, this.state, this.setState.bind(this))
		)
			this.updateLayers();
	}

	render() {
		return (
			<div id="EditingArea" ref="div">
				<canvas ref="canvas"></canvas>
			</div>
		);
	}
}

export default EditingArea;
