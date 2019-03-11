import React, { Component } from "react";
import ListItem from "./sidebarItem.component";

export default class SideBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStyle: ""
        };
    }

    setStyle() {
        this.setState({
            activeStyle: this.props.activeStyle
        });
    }

    setFilter(item) {
        this.props.setFilter(item);
    }

    render() {
        return (
            <React.Fragment>
                <nav
                    id="sidebar"
                    ref="sidebar"
                    className={this.props.activeStyle}
                >
                    <div className="sidebar-header">
                        <h3>Kategorier</h3>
                    </div>
                    <ul className="list-unstyled components">
                        {this.props.cats.map(cat => (
                            <ListItem
                                key={cat._id}
                                item={cat.category}
                                setFilter={this.setFilter.bind(this)}
                            />
                        ))}
                    </ul>
                </nav>
                <style>{`
            #sidebar {
                min-width: 250px;
                min-height: 100vh;
                background: #e0e0e0;
                color: #fff;
                transition: all 0.3s;
              }
  
              #sidebar.active {
                margin-left: -250px;
              }
  
              p {
                font-size: 1em;
                font-weight: 300;
                line-height: 1.7em;
                color: #999;
              }
  
              #sidebar .sidebar-header {
                padding: 20px;
                background: #e0e0e0;
              }
  
              #sidebar ul p {
                color: #fff;
                padding: 10px;
              }
  
              #sidebar ul li div {
                padding: 10px;
                font-size: 1.1em;
                display: block;
              }
              #sidebar ul li div:hover {
                color: #aaaaaa;
                background: #fff;
              }
              #sidebar ul li .selected:hover {
                color: #fff;
                background: #e0e0e0;
              }
                `}</style>
            </React.Fragment>
        );
    }
}
