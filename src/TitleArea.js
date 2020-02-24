import React from "react";
import frame_cross from "./assets/frame/cross.svg";

class TitleArea extends React.Component {
    constructor(props) {
        super(props);
        this.onOpenMenu = this.onOpenMenu.bind(this);
        this.onCloseMenu = this.onCloseMenu.bind(this);
        this.state = {
            title: "• This is a test.map",
            menu: [
                {
                    name: "File",
                    subMenu: [
                        { name: "New", avaliable: false, function: this.testFunction },
                        { name: "Open", avaliable: true, function: this.testFunction },
                        { name: "Close", avaliable: true, function: this.testFunction },
                    ],
                },
                {
                    name: "Edit",
                    subMenu: [
                        { name: "Copy", avaliable: true, function: this.testFunction },
                        { name: "Paste", avaliable: true, function: this.testFunction },
                    ],
                },
            ],
            selected: null,
        };
    }

    testFunction() {
        alert("This button does nothing yet");
    }

    onOpenMenu(index) {
        if (this.state.selected != index) this.setState({ selected: index });
    }

    onCloseMenu() {
        this.setState({ selected: null });
    }

    render() {
        const menu = this.state.menu;

        let menuElement = menu.map((menu, index) => {
            let OpenedMenuContent = null;
            if (this.state.selected === index)
                return (
                    <div key={index}>
                        <div className="background" onClick={this.onCloseMenu}></div>
                        <div
                            className="selectedContainer"
                            onClick={() => {
                                this.onOpenMenu(index);
                            }}
                            onMouseMove={() => {
                                if (this.state.selected != null) this.onOpenMenu(index);
                            }}
                        >
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
                                if (this.state.selected != null) this.onOpenMenu(index);
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
