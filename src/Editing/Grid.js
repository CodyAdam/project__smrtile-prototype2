import React from "react";
import gridPath from "../assets/grid/grid-dot.svg";

export default class EditingArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            div: null,
            image: gridPath,
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

        div.style.backgroundSize = grid.size + "px";
        div.style.left = grid.offset.x + container.offset.x + "px";
        div.style.top = grid.offset.y + container.offset.y + "px ";

        let width = map.width * grid.size;
        let height = map.height * grid.size;

        div.style.width = width + "px";
        div.style.height = height + "px";
    }

    render() {
        return <div className="grid" ref="div"></div>;
    }
}
