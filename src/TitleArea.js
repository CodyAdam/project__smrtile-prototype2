import React from "react";
import frame_cross from "./assets/frame/cross.svg";

class TitleArea extends React.Component {
    constructor(props) {
        super(props);
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
        };
    }

    testFunction() {
        alert("This button does nothing yet");
    }

    render() {
        const menu = this.state.menu;

        let menuElement = menu.map((menu, index) => {
            return (
                <div className="container" key={index}>
                    <span className="name">{menu.name}</span>
                </div>
            );
        });

        console.log(menuElement);

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
