import React from "react";
import eyeClose from "./assets/panel/eye_close.png";
import eyeOpen from "./assets/panel/eye_open.png";

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
				<PropertiesPanel />
				<LayersPanel />
			</div>
		);
	}
}

class PropertiesPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			panelName: "Information",
			title: "How to use",
			description:
				"Left Click : Place blocks / Right Click : Delete blocks / Middle Click : Pan the camera"
		};
	}
	render() {
		//TODO faire un sous component qui correspondqu differents objet du panel
		return (
			<div className="propertiesPanel">
				<div className="header">
					<h1>{this.state.panelName}</h1>
				</div>
				<div className="body">
					<h2>{this.state.title}</h2>
					<p>{this.state.description}</p>
				</div>
			</div>
		);
	}
}

class LayersPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			panelName: "Layers"
		};
	}
	render() {
		return (
			<div className="layersPanel">
				<div className="header">
					<h1>{this.state.panelName}</h1>
				</div>
				<div className="layersList">
					<Layer name="foreground" />
					<Layer name="game object" />
					<Layer name="background" />
				</div>
			</div>
		);
	}
}

class Layer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			visible: true
		};
	}

	visibleToggle(img) {
		const visible = this.state.visible;
		if (visible) img.src = eyeClose;
		else img.src = eyeOpen;
		this.setState({ visible: !visible });
	}

	render() {
		return (
			<div className="layer">
				<img
					className="visibleButton"
					onClick={img => this.visibleToggle(img)}
					src={eyeOpen}
					alt="eyeOpen"
				></img>
				<img className="interactableButton" src={eyeOpen} alt="eyeOpen"></img>
				<p className="layerName">{this.state.name}</p>
			</div>
		);
	}
}

export default PanelArea;
