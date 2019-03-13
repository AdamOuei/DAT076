import React, { Component } from "react";
import ListItem from "./sidebarItem.component";
import "../styles/SideBar.css";

export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStyle: ""
        };
    }

    /**
     * Opens/closes sidebar based on props
     */
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
            </React.Fragment>
        );
    }
}
