import React from "react";
import tileImg from "./assets/tileset/test.png";

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
				<TileButton tileset={tileImg} x={0} y={0} width={236} height={236} />
				<TileButton tileset={tileImg} x={0} y={0} width={236} height={236} />
				<TileButton tileset={tileImg} x={0} y={0} width={236} height={236} />
				<TileButton />
				<TileButton />
				<TileButton tileset={tileImg} x={0} y={0} width={236} height={236} />
				<TileButton tileset={tileImg} x={0} y={0} width={236} height={236} />
				<TileButton tileset={tileImg} x={0} y={0} width={236} height={236} />
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
		img.src = tileImg;
		ctx.drawImage(img, 0, 0, 50, 50);
		//ctx.clearRect(2, 2, 46, 46);
	}

	render() {
		return (
			<div className="tileButton">
				<button>
					<canvas className="buttonCanvas" ref="canvas" width="50" height="50">
						<img src={tileImg} alt="" width="50" height="50" />
					</canvas>
				</button>
			</div>
		);
	}
}

export default ToolBarArea;
