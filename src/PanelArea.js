import React from "react";
import eyeClose from "./assets/panel/eye_close.png";
import eyeOpen from "./assets/panel/eye_open.png";

class PanelArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Information",
            title: "How to use",
            description: "Left Click : Place blocks / Right Click : Delete blocks / Middle Click : Pan the camera",
        };
    }
    render() {
        //TODO faire un sous component qui correspondqu differents objet du panel
        return (
            <div id="PanelArea">
                <PropertiesPanel />
                <LayersPanel layers={this.props.layers} onLayerChange={this.props.onLayerChange} />
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
            size: "200px",
        };
    }

    changePanelSize(newSize) {
        this.setState({ size: newSize });
    }

    render() {
        return (
            <div className="propertiesPanel">
                <div className="header">{this.state.panelName}</div>
                <div className="body" style={{ height: this.state.size }}>
                    <h2>{this.state.title}</h2>
                    <p> Left Click : Place blocks</p>
                    <p> Right Click : Delete blocks</p>
                    <p> Middle Click : Pan the camera</p>
                    <p> Mouse Wheel : Zoom</p>
                </div>
                <div className="slider"></div>
            </div>
        );
    }
}

class LayersPanel extends React.Component {
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

        if (this.props.index === 0) this.onSelect();
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
        else container.style.backgroundColor = "rgb(39, 39, 41)";
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

export default PanelArea;
