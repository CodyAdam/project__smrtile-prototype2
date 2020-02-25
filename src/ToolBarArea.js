import React from "react";
import Tile from "./Editing/Tile";

class ToolBarArea extends React.Component {
    render() {
        const objectsButtonsElements = this.props.objects.map((object, index) => {
            return (
                <TileButton
                    objects={this.props.objects}
                    object={object}
                    onObjectChange={this.props.onObjectChange}
                    key={index}
                    index={index}
                />
            );
        });
        return <div id="ToolBarArea">{objectsButtonsElements}</div>;
    }
}

class TileButton extends React.Component {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.drawButton = this.drawButton.bind(this);
    }

    onSelect() {
        let objects = this.props.objects;
        objects.forEach((object, i) => {
            let newObject = new Tile(object.source, object.pos, object.relative);
            newObject.active = this.props.index === i;
            this.props.onObjectChange(newObject, i);
        });
    }

    componentDidMount() {
        this.props.object.image.onload = this.drawButton();
    }

    componentDidUpdate() {
        this.drawButton();
    }

    drawButton() {
        const ctx = this.refs.canvas.getContext("2d");
        const object = this.props.object;

        ctx.drawImage(object.image, 0, 0, 50, 50);
        if (this.props.object.active) {
            ctx.clearRect(15, 15, 20, 20);
        }
    }

    render() {
        return (
            <div className="tileButton">
                <div>
                    <canvas
                        className="buttonCanvas"
                        ref="canvas"
                        width="50"
                        height="50"
                        onClick={this.onSelect}
                    ></canvas>
                </div>
            </div>
        );
    }
}

export default ToolBarArea;
