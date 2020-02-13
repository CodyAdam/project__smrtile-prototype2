import React from "react";
import frame_cross from "./assets/frame/cross.svg";

class TitleArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "• This is a test.map"
		};
	}

	componentDidMount() {
		this.refs.minimize.addEventListener("click", this.onMinimize);
		this.refs.maximize.addEventListener("click", this.onMaximize);
		this.refs.close.addEventListener("click", this.onClose);
	}

	onMinimize() {
		//const win = remote.getCurrentWindow();
		//win.minimize();
	}

	onMaximize() {
		// var win = remote.getCurrentWindow();
		// if (!win.isMaximized()) win.maximize();
		// else win.unmaximize();
	}

	onClose() {
		//const win = remote.getCurrentWindow();
		//win.close();
	}

	render() {
		return (
			<div id="TitleArea">
				<div className="drag"></div>
				<p className="title">{this.state.title}</p>
				<div className="iconContainer">
					<img ref="minimize" src={frame_cross} alt="" />
					<img ref="maximize" src={frame_cross} alt="" />
					<img ref="close" src={frame_cross} alt="" />
				</div>
			</div>
		);
	}
}

export default TitleArea;
