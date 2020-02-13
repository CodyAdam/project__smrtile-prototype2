import React from "react";
import testImg from "./assets/tileset/test.png";

class ToolBarArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div id="ToolBarArea">
				<TileButton tileset={testImg} x={0} y={0} width={236} height={236} />
				<TileButton tileset={testImg} x={0} y={0} width={236} height={236} />
				<TileButton tileset={testImg} x={0} y={0} width={236} height={236} />
				<TileButton />
				<TileButton />
			</div>
		);
	}
}

class TileButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tileset: props.tileset,
			position: { x: props.x, y: props.y },
			width: props.width,
			height: props.height
		};
	}

	componentDidMount() {
		const ctx = this.refs.canvas.getContext("2d");
		let img = new Image();
		img.src = this.state.tileset;
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(0, 0, 50, 50);
		ctx.clearRect(2, 2, 46, 46);
	}

	render() {
		return (
			<div className="tileButton">
				<canvas className="buttonCanvas" ref="canvas" width="50" height="50"></canvas>
			</div>
		);
	}
}

export default ToolBarArea;
