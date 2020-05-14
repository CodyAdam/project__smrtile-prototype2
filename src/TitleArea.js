import React from "react";
import frame_cross from "./assets/frame/cross.svg";

class TitleArea extends React.Component {
    constructor(props) {
        super(props);
        this.onOpenMenu = this.onOpenMenu.bind(this);
        this.onCloseMenu = this.onCloseMenu.bind(this);
        this.testFunction = this.testFunction.bind(this);
        this.state = {
            title: "• This is a test This is a test This is a test.map",
            menu: [
                {
                    name: "File",
                    subMenu: [
                        { name: "New", avaliable: true, function: this.testFunction },
                        { name: "Open", avaliable: true, function: this.testFunction },
                        { name: "Close", avaliable: false, function: this.testFunction },
                    ],
                },
                {
                    name: "Edit",
                    subMenu: [
                        { name: "Copy", avaliable: true, function: this.testFunction },
                        { name: "Paste", avaliable: true, function: this.testFunction },
                        { name: "Undo", avaliable: false, function: this.testFunction },
                        { name: "Redo", avaliable: false, function: this.testFunction },
                    ],
                },
            ],
        };
    }

    testFunction() {
        alert("This button does nothing yet");
        this.onCloseMenu();
    }

    componentDidMount() {
        window.addEventListener("keydown", (event) => {
            if (event.ctrlKey || event.metaKey) {
                switch (String.fromCharCode(event.which).toLowerCase()) {
                    case "s":
                        event.preventDefault();
                        alert("ctrl-s");
                        break;
                    case "z":
                        event.preventDefault();
                        alert("ctrl-z");
                        break;
                    default:
                        break;
                }
            }
        });
    }

    onOpenMenu(index) {
        if (this.state.selected !== index) this.setState({ selected: index });
    }

    onCloseMenu() {
        this.setState({ selected: null });
    }

    render() {
        const menu = this.state.menu;
        const selected = this.state.selected;

        let subMenuElement = null;
        if (selected !== null)
            subMenuElement = menu[selected].subMenu.map((subMenu, index) => {
                let style = null;
                if (!subMenu.avaliable) style = { color: "#B8B8B6" };
                return (
                    <div key={index} className="subContainer" onClick={subMenu.function} style={style}>
                        {subMenu.name}
                    </div>
                );
            });

        let menuElement = menu.map((menu, index) => {
            if (selected === index)
                return (
                    <div key={index}>
                        <div className="background" onClick={this.onCloseMenu}></div>
                        <div
                            className="selectedContainer"
                            onClick={() => {
                                this.onOpenMenu(index);
                            }}
                            onMouseMove={() => {
                                if (selected != null) this.onOpenMenu(index);
                            }}
                        >
                            <div className="subMenu">{subMenuElement}</div>
                            <span className="name">{menu.name}</span>
                        </div>
                    </div>
                );
            else
                return (
                    <div key={index}>
                        <div
                            className="container"
                            onClick={() => {
                                this.onOpenMenu(index);
                            }}
                            onMouseMove={() => {
                                if (selected != null) this.onOpenMenu(index);
                            }}
                        >
                            <span className="name">{menu.name}</span>
                        </div>
                    </div>
                );
        });

        return (
            <div id="TitleArea">
                <div className="menu">{menuElement}</div>
                {/* <div className="drag"></div> */}
                <p className="title">{this.state.title}</p>
                <div className="iconContainer">
                    <img ref="minimize" src={frame_cross} alt="" />
                    <img ref="maximize" src={frame_cross} alt="" />
                    <img ref="close" src={frame_cross} alt="" />
                </div>
            </div>
        );
    }
}

export default TitleArea;
