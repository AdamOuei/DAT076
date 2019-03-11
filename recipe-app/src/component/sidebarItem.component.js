import React, { Component } from "react";

export default class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: ""
        };
    }
    setFilter() {
        this.props.setFilter(this.props.item);
        this.state.selected === ""
            ? this.setState({ selected: "selected" })
            : this.setState({ selected: "" });
    }

    render() {
        let item = this.props.item;
        return (
            <React.Fragment>
                <li onClick={this.setFilter.bind(this)}>
                    <div className={this.state.selected}>{item}</div>
                </li>
                <style>{`
              .selected {
                color: #aaaaaa;
                background: #fff;
                font-weight: bold;
                border: solid;
              }
            `}</style>
            </React.Fragment>
        );
    }
}
