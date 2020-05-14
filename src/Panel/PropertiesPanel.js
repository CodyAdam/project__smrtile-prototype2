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
        let propertie = <div>this.props.selected;</div>;
        if (this.props.selected !== null && this.props.selected !== undefined) {
            propertie = (
                <div>
                    <span className="subTitle">{this.props.selected.state.name} Properties</span>
                    <br />
                    {this.props.selected.state.properties.name}
                </div>
            );
        }

        let informations = (
            <div>
                <span className="subTitle">{this.state.title}</span>
                <span className="info">
                    <br />
                    Left Click : Place blocks <br />
                    Right Click : Delete blocks
                    <br />
                    Middle Click : Pan the camera
                    <br />
                    Mouse Wheel : Zoom
                    <br />
                    <br />
                </span>
            </div>
        );

        return (
            <div className="propertiesPanel" style={{ height: this.props.panelHeight }}>
                <div className="header">{this.state.panelName}</div>
                <div className="body">
                    {informations}

                    {propertie}
                </div>
            </div>
        );
    }
}
