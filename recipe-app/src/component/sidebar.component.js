import React, { Component } from "react";
import { ListItem } from "@material-ui/core";
import "../App.css";

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setFilter(category) {
    let index = this.state.filter.indexOf(category);
    if (index > -1) {
      this.state.filter.splice(index, 1);
      this.setState(prevVal => ({
        filter: prevVal.filter
      }));
    } else {
      this.setState(prevVal => ({
        filter: [...prevVal.filter, category]
      }));
    }
  }
  showMenu() {
    this.state.activeStyle === ""
      ? this.setState({ activeStyle: "active" })
      : this.setState({ activeStyle: "" });
  }
  render() {
    let cats = ["Kött", "Kyckling", "Fisk", "Vegetariskt", "Vegan"];
    return (
      <div>
        <div className="wrapper">
          <nav id="sidebar" ref="sidebar" className={this.state.activeStyle}>
            <div className="sidebar-header">
              <h3>Kategorier</h3>
            </div>
            <ul className="list-unstyled components">
              {cats.map(cat => (
                <ListItem
                  key={cat}
                  item={cat}
                  setFilter={this.setFilter.bind(this)}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
