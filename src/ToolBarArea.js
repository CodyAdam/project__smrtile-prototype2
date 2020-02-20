import React from "react";
import tile1 from "./assets/tileset/test1.png";
import tile2 from "./assets/tileset/test2.png";
import tile3 from "./assets/tileset/test3.png";

class ToolBarArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			select: null
		};

		this.buttons = [];
	}

	componentDidMount() {
		this.buttons.push();
	}

	//select(selection) {
	//	this.state.select.selected = false;
	//	selection.selected = true;
	//	this.setState({ select: selection });
	//}

	render() {
		return (
			<div id="ToolBarArea">
				<TileButton tileset={tile1} x={0} y={0} width={512} height={512} />
				<TileButton tileset={tile2} x={0} y={0} width={512} height={512} />
				<TileButton tileset={tile3} x={0} y={0} width={512} height={512} />
			</div>
		);
	}
}

class TileButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: false,
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
		img.onload = ctx.drawImage(
			img,
			this.state.position.x,
			this.state.position.y,
			this.state.width,
			this.state.height,
			0,
			0,
			50,
			50
		);
	}

	render() {
		return (
			<div className="tileButton">
				<button>
					<canvas className="buttonCanvas" ref="canvas" width="50" height="50"></canvas>
				</button>
			</div>
		);
	}
}

export default ToolBarArea;
