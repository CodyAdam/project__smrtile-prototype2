import React from "react";
import frame_cross from "./assets/frame/cross.svg";

class TitleArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "• This is a test.map"
		};
	}
	render() {
		return (
			<div id="TitleArea">
				<div className="drag"></div>
				<p className="title">{this.state.title}</p>
				<div className="iconContainer">
					<img src={frame_cross} alt="" />
					<img src={frame_cross} alt="" />
					<img src={frame_cross} alt="" />
				</div>
			</div>
		);
	}
}

export default TitleArea;
