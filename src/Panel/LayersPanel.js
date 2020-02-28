import React from "react";

import eyeClose from "../assets/panel/eye_close.png";
import eyeOpen from "../assets/panel/eye_open.png";

export class LayersPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panelName: "Layers",
        };
    }

    render() {
        const layersElements = this.props.layers.map((layer, index) => {
            return (
                <Layer
                    layers={this.props.layers}
                    layer={layer}
                    onLayerChange={this.props.onLayerChange}
                    key={index}
                    index={index}
                    select={this.props.select}
                />
            );
        });

        return (
            <div className="layersPanel">
                <div className="header">{this.state.panelName}</div>
                <div className="layersList">{layersElements}</div>
            </div>
        );
    }
}

class Layer extends React.Component {
    constructor(props) {
        super(props);
        this.updateColor = this.updateColor.bind(this);
        this.onVisibleToggle = this.onVisibleToggle.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.properties = {
            name: {
                name: "Name",
                value: this.props.layer.name,
                type: "string",
                set: this.setName,
            },
        };

        if (this.props.index === 0) this.onSelect();
    }

    setName(value) {
        this.name = value;
    }

    componentDidMount() {
        this.updateColor();
    }

    componentDidUpdate() {
        this.updateColor();
    }

    updateColor() {
        const container = this.refs.container;
        if (this.props.layer.active) container.style.backgroundColor = "rgb(175, 53, 53)";
        else container.style.backgroundColor = "rgb(255, 255, 255, 0.06)";
    }

    onVisibleToggle() {
        let newLayer = this.props.layer;
        newLayer.visible = !newLayer.visible;
        this.props.onLayerChange(newLayer, this.props.index);
    }

    onSelect() {
        let layers = this.props.layers;
        layers.forEach((layer, i) => {
            let newLayer = layer;
            newLayer.active = this.props.index === i;
            this.props.onLayerChange(newLayer, this.props.index);
        });
        this.props.select(this);
    }

    render() {
        const eye = !this.props.layer.visible ? eyeClose : eyeOpen;

        return (
            <div className="layer" ref="container">
                <img className="visibleButton" onClick={this.onVisibleToggle} src={eye} alt="eyeOpen"></img>
                <div className="text-container" onClick={this.onSelect}>
                    <p className="layerName">{this.props.layer.name}</p>
                </div>
            </div>
        );
    }
}
