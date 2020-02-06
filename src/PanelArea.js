import React from "react";

class PanelArea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "Information",
			title: "How to use",
			description:
				"Left Click : Place blocks / Right Click : Delete blocks / Middle Click : Pan the camera"
		};
	}
	render() {
		//TODO faire un sous component qui correspondqu differents objet du panel
		return (
			<div id="PanelArea">
				<div className="header">
					<h1>{this.state.name}</h1>
				</div>
				<div className="body">
					<h2>{this.state.title}</h2>
					<p>{this.state.description}</p>
				</div>
			</div>
		);
	}
}

export default PanelArea;
