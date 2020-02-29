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
            console.log(this.props.selected);

            propertie = (
                <div>
                    <span className="subTitle">{this.props.selected.constructor.name} Properties</span>
                    <br />
                    <br />
                    <TextInput propertie={this.props.selected.state.properties.name} />
                </div>
            );
        }

        let informations = (
            <span className="info">
                <span className="subTitle">{this.state.title}</span>
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
        );

        return (
            <div className="propertiesPanel" style={{ height: this.props.height }}>
                <div className="header">{this.state.panelName}</div>
                <div className="body">
                    {informations}

                    {propertie}
                </div>
            </div>
        );
    }
}

class TextInput extends React.Component {
    componentDidUpdate() {
        this.refs.input.value = this.props.propertie.value;
    }
    componentDidMount() {
        this.refs.input.value = this.props.propertie.value;
    }
    render() {
        const propertie = this.props.propertie;
        return (
            <div>
                <span className="input">
                    {propertie.name}
                    <input
                        type="text"
                        className="textInput"
                        ref="input"
                        onChange={(input) => {
                            propertie.set(input.target.value);
                        }}
                    />
                </span>
                <br />
            </div>
        );
    }
}
