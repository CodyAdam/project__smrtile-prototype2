import React from "react";

class ToolBarArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div id="ToolBarArea">
				<TileButton />
				<TileButton />
				<TileButton />
				<TileButton />
				<TileButton />
				<TileButton />
				<TileButton />
				<TileButton />
			</div>
		);
	}
}

class TileButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div id="TileButton">
				<button>IMG</button>
			</div>
		);
	}
}

export default ToolBarArea;
