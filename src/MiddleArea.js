import React from "react";
import Draggable from "react-draggable";

import EditingArea from "./Editing/EditingArea.js";
import { PanelArea } from "./Panel/PanelArea";

export default class MiddleArea extends React.Component {
    constructor(props) {
        super(props);
        this.onDrag = this.onDrag.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.state = {
            panelWidth: document.body.clientWidth * 0.25,
            panelMin: 0.15,
            panelMax: 0.8,
        };
    }

    componentDidMount() {
        window.addEventListener("resize", () => {
            const min = this.state.panelMin * document.body.clientWidth;
            const max = this.state.panelMax * document.body.clientWidth;
            let value = this.state.panelWidth;
            if (value < min) value = min;
            else if (value > max) value = max;
            this.setState({ panelWidth: value });
        });
    }

    onDrag(e, ui) {
        document.body.style.cursor = "ew-resize";
        const min = this.state.panelMin * document.body.clientWidth;
        const max = this.state.panelMax * document.body.clientWidth;
        let value = this.state.panelWidth;
        value -= ui.deltaX;

        if (value < min) value = min;
        else if (value > max) value = max;

        this.setState({ panelWidth: value });

        this.refs.editingArea.handleResize();
    }

    onDragEnd() {
        document.body.style.cursor = "default";
    }

    render() {
        return (
            <div id="MiddleArea" ref="div">
                <EditingArea
                    ref="editingArea"
                    layers={this.props.layers}
                    tools={this.props.tools}
                    map={this.props.map}
                />
                <Draggable axis="none" onDrag={this.onDrag} onStop={this.onDragEnd}>
                    <div className="slider"></div>
                </Draggable>
                <PanelArea
                    layers={this.props.layers}
                    select={this.props.select}
                    selected={this.props.selected}
                    onLayerChange={this.props.onLayerChange}
                    panelWidth={this.state.panelWidth}
                />
            </div>
        );
    }
}
