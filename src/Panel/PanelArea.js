import React from "react";
import Draggable from "react-draggable";

import PropertiesPanel from "./PropertiesPanel";
import { LayersPanel } from "./LayersPanel";

export class PanelArea extends React.Component {
    constructor(props) {
        super(props);
        this.onDrag = this.onDrag.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.state = {
            panelHeight: 400,
            panelMin: 0,
            panelMax: 1,
        };
    }

    componentDidMount() {
        window.addEventListener("resize", () => {
            const min = this.state.panelMin * document.body.clientHeight + 25;
            const max = this.state.panelMax * document.body.clientHeight - 154;
            let value = this.state.panelHeight;
            if (value < min) value = min;
            else if (value > max) value = max;
            this.setState({ panelHeight: value });
        });
    }

    onDrag(e, ui) {
        document.body.style.cursor = "ns-resize";
        const min = this.state.panelMin * document.body.clientHeight + 25;
        const max = this.state.panelMax * document.body.clientHeight - 154;
        let value = this.state.panelHeight;
        value += ui.deltaY;

        if (value < min) value = min;
        else if (value > max) value = max;

        this.setState({ panelHeight: value });
    }

    onDragEnd() {
        document.body.style.cursor = "default";
    }

    render() {
        return (
            <div id="PanelArea" style={{ width: this.props.width }}>
                <PropertiesPanel height={this.state.panelHeight + "px"} selected={this.props.selected} />
                <Draggable axis="none" onDrag={this.onDrag} onStop={this.onDragEnd}>
                    <div className="slider">
                        <div className="break"></div>
                    </div>
                </Draggable>
                <LayersPanel
                    layers={this.props.layers}
                    onLayerChange={this.props.onLayerChange}
                    select={this.props.select}
                />
            </div>
        );
    }
}
