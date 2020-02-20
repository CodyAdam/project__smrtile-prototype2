import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";

import EditingArea from "./Editing/EditingArea.js";
import PanelArea from "./PanelArea";
import TitleArea from "./TitleArea";
import ToolBarArea from "./ToolBarArea";

import { Layer, Grid } from "./Editing/Layer";
import Camera from "./Editing/Tools/Camera";
import Brush from "./Editing/Tools/Brush";

import tile1 from "./assets/tileset/test1.png";
import tile2 from "./assets/tileset/test2.png";
import tile3 from "./assets/tileset/test3.png";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			map: {
				width: 40,
				height: 30
			},
			layers: [new Grid(40, 30), new Layer("layer 1", 40, 30)],
			tools: { brush: new Brush(2), camera: new Camera() }
		};

		//TODO make the grid as css background

		let tile = new Image();
		tile.src = tile1;
		this.state.tools.brush.sprite = tile;
		this.state.tools.brush.active = true;
	}

	render() {
		return (
			<div id="App">
				<EditingArea
					layers={this.state.layers}
					tools={this.state.tools}
					map={this.state.map}
				/>
				<TitleArea />
				<ToolBarArea tools={this.state.tools} />
				<PanelArea />
				<div id="StatusBarArea"></div>
			</div>
		);
	}
}

//const map = {
//	name: "TestingMap",
//	size: { x: 30, y: 40 },
//	background: "Forest",
//	layers: [
//		{
//			name: "layer1",
//			index: 1,
//			visible: true,
//			type: "solid",
//			tiles: [
//				{ x: 3, y: 6, texture: "grass", type: "solidBlock", visible: true },
//				{ x: 13, y: 3, texture: "grass", type: "solidBlock", visible: true },
//				{ x: 4, y: 6, texture: "grass", type: "solidBlock", visible: true },
//				{ x: 1, y: 2, texture: "grass", type: "solidBlock", visible: true }
//			]
//		},
//		{
//			name: "layer2",
//			index: 0,
//			visible: true,
//			type: "decoration",
//			tiles: [
//				{ x: 5, y: 5, texture: "grass", type: "notInterative", visible: true },
//				{ x: 6, y: 6, texture: "grass", type: "notInterative", visible: true },
//				{ x: 7, y: 7, texture: "grass", type: "notInterative", visible: true }
//			]
//		}
//	]
//};

ReactDOM.render(<App />, document.getElementById("root"));
