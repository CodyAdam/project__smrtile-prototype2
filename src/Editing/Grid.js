import React from "react";
import gridPath from "../assets/grid/grid-dot.svg";

export default class EditingArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            div: null,
            image: gridPath,
            outlineOffset: 0.5,
            opacity: 0.2,
        };
    }

    componentDidMount() {
        this.setState({ div: this.refs.div }, () => {
            const div = this.state.div;
            div.style.backgroundImage = "url(" + this.state.image + ")";
        });
    }

    componentDidUpdate() {
        const div = this.state.div;
        const grid = this.props.grid;
        const container = this.props.container;
        const map = this.props.map;

        const outlineOffset = this.state.outlineOffset * grid.size;

        div.style.opacity = this.state.opacity;
        div.style.backgroundSize = grid.size + "px";
        div.style.backgroundPosition = outlineOffset + "px " + outlineOffset + "px";
        div.style.left = grid.offset.x + container.offset.x - outlineOffset + "px";
        div.style.top = grid.offset.y + container.offset.y - outlineOffset + "px ";

        div.style.width = map.width * grid.size + 2 * outlineOffset + "px";
        div.style.height = map.height * grid.size + 2 * outlineOffset + "px";
    }

    render() {
        return <div className="grid" ref="div"></div>;
    }
}
