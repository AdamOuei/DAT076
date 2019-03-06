import React, { Component } from "react";

export default class ListItem extends Component {
  setFilter() {
    this.props.setFilter(this.props.item);
  }

  render() {
    let item = this.props.item;
    return (
      <li onClick={this.setFilter.bind(this)}>
        <div>{item}</div>
      </li>
    );
  }
}
