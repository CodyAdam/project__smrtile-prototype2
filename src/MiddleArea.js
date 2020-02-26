import React from "react";
import Draggable from "react-draggable";

import EditingArea from "./Editing/EditingArea.js";
import PanelArea from "./Panel/PanelArea";

export default class MiddleArea extends React.Component {
    constructor(props) {
        super(props);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.state = {
            panelWidth: 500,
            panelMin: 0.15,
            panelMax: 0.8,
        };
    }

    onDragStart() {
        document.body.style.cursor = "ew-resize";
    }

    onDrag(e, ui) {
        const min = this.state.panelMin * document.body.clientWidth;
        const max = this.state.panelMax * document.body.clientWidth;
        let value = this.state.panelWidth;
        value -= ui.deltaX;

        if (value - ui.deltaX < min) this.setState({ panelWidth: min });
        else if (value - ui.deltaX > max) this.setState({ panelWidth: max });
        else this.setState({ panelWidth: value });

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
                    map={this.props.map + "px"}
                />
                <Draggable
                    axis="none"
                    bound={{ right: 150 }}
                    onStart={this.onDragStart}
                    onDrag={this.onDrag}
                    onStop={this.onDragEnd}
                    defaultPosition={{ x: this.lastHeight }}
                >
                    <div className="slider"></div>
                </Draggable>
                <PanelArea
                    layers={this.props.layers}
                    onLayerChange={this.props.onLayerChange}
                    width={this.state.panelWidth}
                />
            </div>
        );
    }
}
