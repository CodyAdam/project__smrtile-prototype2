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
			panelName: "Layers",
			selected: [0],
			layers: ["foreground", "qwertyui opasdfghjk lzxc vbnm", "background"]
		};
	}

	setSelectedLayers(indexArray) {
		this.setState({ selected: indexArray });
	}

	render() {
		const layersElements = this.state.layers.map((name, index) => {
			const isSelected = this.state.selected.includes(index);
			return (
				<Layer
					name={name}
					selected={isSelected}
					key={index}
					index={index}
					setSelectedLayers={this.setSelectedLayers.bind(this)}
				/>
			);
		});
		return (
			<div className="layersPanel">
				<div className="header">
					<h1>{this.state.panelName}</h1>
				</div>
				<div className="layersList">{layersElements}</div>
			</div>
		);
	}
}

class Layer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			visible: true,
			selected: this.props.selected,
			index: this.props.index
		};
	}

	handleVisibleToggle() {
		const visible = this.state.visible;
		this.setState({ visible: !visible });
	}

	componentDidMount() {
		const container = this.refs.container;
		if (this.state.selected) container.style.backgroundColor = "rgb(175, 53, 53)";
	}

	componentDidUpdate() {
		const container = this.refs.container;
		if (this.props.selected) container.style.backgroundColor = "rgb(175, 53, 53)";
		else container.style.backgroundColor = "rgb(39, 39, 41)";
	}

	render() {
		const eye = !this.state.visible ? eyeClose : eyeOpen;

		return (
			<div className="layer" ref="container">
				<img
					className="visibleButton"
					onClick={() => this.handleVisibleToggle()}
					src={eye}
					alt="eyeOpen"
				></img>
				<div
					className="text-container"
					onClick={() => this.props.setSelectedLayers([this.state.index])}
				>
					<p className="layerName">{this.state.name}</p>
				</div>
			</div>
		);
	}
}

export default PanelArea;
