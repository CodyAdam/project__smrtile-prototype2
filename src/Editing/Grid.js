import React from "react";
import gridPath from "../assets/grid/grid-dot.svg";

export default class EditingArea extends React.Component {
    constructor(props) {
        super(props);
        this.getCornerOnScreen = this.getCornerOnScreen.bind(this);
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

    getCornerOnScreen() {
        const grid = this.props.grid;
        const container = this.props.container;
        const map = this.props.map;

        return {
            LT:
                grid.offset.x >= 0 &&
                grid.offset.x <= container.width &&
                grid.offset.y >= 0 &&
                grid.offset.y <= container.height,
            LB:
                grid.offset.x >= 0 &&
                grid.offset.x <= container.width &&
                grid.offset.y + map.height * grid.size >= 0 &&
                grid.offset.y + map.height * grid.size <= container.height,
            RT:
                grid.offset.x + map.width * grid.size >= 0 &&
                grid.offset.x + map.width * grid.size <= container.width &&
                grid.offset.y >= 0 &&
                grid.offset.y <= container.height,
            RB:
                grid.offset.x + map.width * grid.size >= 0 &&
                grid.offset.x + map.width * grid.size <= container.width &&
                grid.offset.y + map.height * grid.size >= 0 &&
                grid.offset.y + map.height * grid.size <= container.height,
        };
    }

    componentDidUpdate() {
        const corners = this.getCornerOnScreen();
        const div = this.state.div;
        const grid = this.props.grid;
        const container = this.props.container;
        const map = this.props.map;

        div.style.backgroundSize = grid.size + "px";
        div.style.left = grid.offset.x + container.offset.x + "px";
        div.style.top = grid.offset.y + container.offset.y + "px ";

        let width = 0;
        let height = 0;

        if (corners.RT) width = map.width * grid.size;
        else width = container.width - grid.offset.x;

        if (corners.LB) height = map.height * grid.size;
        else height = container.height - grid.offset.y;

        div.style.width = width + "px";
        div.style.height = height + "px";
    }

    render() {
        return <div className="grid" ref="div"></div>;
    }
}
