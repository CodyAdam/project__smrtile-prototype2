import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";

import MiddleArea from "./MiddleArea";
import TitleArea from "./TitleArea";
import ToolBarArea from "./ToolBarArea";

import { Layer } from "./Editing/Layer";
import Camera from "./Editing/Tools/Camera";
import Brush from "./Editing/Tools/Brush";
import Tile from "./Editing/Tile";

import source1 from "./assets/tileset/red.png";
import source2 from "./assets/tileset/pink.png";
import source3 from "./assets/tileset/green.png";

class App extends React.Component {
    constructor(props) {
        document.oncontextmenu = (e) => {
            e.preventDefault();
        };
        super(props);
        this.onObjectChange = this.onObjectChange.bind(this);
        this.onLayerChange = this.onLayerChange.bind(this);
        this.updateBrush = this.updateBrush.bind(this);
        this.select = this.select.bind(this);

        this.state = {
            tools: {
                brush: new Brush(),
                camera: new Camera(),
                getActive() {
                    for (const [, tool] of Object.entries(this)) {
                        if (tool.active) return tool;
                    }
                    return this.brush;
                },
            },

            map: {
                width: 30,
                height: 25,
            },
            layers: [new Layer("layer 1", 30, 25), new Layer("layer 2", 30, 25), new Layer("layer 3", 30, 25)],
            selected: null,
            objects: [
                new Tile(source1, 0, 0, 512, 512),
                new Tile(source2, 0, 0, 512, 512),
                new Tile(source3, 0, 0, 512, 512),
            ],
        };
    }

    select(selection) {
        this.setState({ selected: selection });
    }

    componentDidMount() {
        this.updateBrush();

        //make the first object selected
        let firstObj = this.state.objects[0];
        firstObj.active = true;
        this.onObjectChange(firstObj, 0);
    }

    onObjectChange(newObject, index) {
        let newObjects = this.state.objects;
        newObjects[index] = newObject;
        this.setState({ objects: newObjects });
        this.updateBrush();
    }

    updateBrush() {
        let tools = this.state.tools;

        //Update the object to the active one
        let activeIndex = 0;
        this.state.objects.forEach((object, index) => {
            if (object.active) {
                activeIndex = index;
            }
        });
        tools.brush.object = this.state.objects[activeIndex];

        this.setState({ tools: tools });
    }

    onLayerChange(index, newLayer) {
        let newLayers = this.state.layers;
        newLayers[index] = newLayer;
        this.setState({ layers: newLayers });
    }

    render() {
        return (
            <div id="App">
                <TitleArea />
                <ToolBarArea objects={this.state.objects} onObjectChange={this.onObjectChange} />
                <MiddleArea
                    layers={this.state.layers}
                    tools={this.state.tools}
                    map={this.state.map}
                    onLayerChange={this.onLayerChange}
                    select={this.select}
                    selected={this.state.selected}
                />
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
