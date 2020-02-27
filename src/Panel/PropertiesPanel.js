import React from "react";

export default class PropertiesPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panelName: "Information",
            title: "How to use",
        };
    }

    changePanelSize(newSize) {
        this.setState({ size: newSize });
    }

    render() {
        return (
            <div className="propertiesPanel" style={{ height: this.props.height }}>
                <div className="header">{this.state.panelName}</div>
                <div className="body">
                    <h2>{this.state.title}</h2>
                    <p> Left Click : Place blocks</p>
                    <p> Right Click : Delete blocks</p>
                    <p> Middle Click : Pan the camera</p>
                    <p> Mouse Wheel : Zoom</p>
                </div>
            </div>
        );
    }
}
