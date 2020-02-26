import React from "react";
import Draggable from "react-draggable";

import EditingArea from "./Editing/EditingArea.js";
import PanelArea from "./Panel/PanelArea";

export default class MiddleArea extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="MiddleArea">
                <EditingArea layers={this.props.layers} tools={this.props.tools} map={this.props.map} />
                <PanelArea layers={this.props.layers} onLayerChange={this.props.onLayerChange} />
            </div>
        );
    }
}
