import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";

import EditingArea from "./Editing/EditingArea.js";
import PanelArea from "./PanelArea";
import TitleArea from "./TitleArea";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="App">
                <EditingArea />
                <TitleArea />
                <div id="ToolBarArea"></div>
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
