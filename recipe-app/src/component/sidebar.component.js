import React, { Component } from "react";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStyle: ""
    };

    this.showMenu = this.showMenu.bind(this);
  }

  showMenu() {
    this.state.activeStyle === ""
      ? this.setState({ activeStyle: "active" })
      : this.setState({ activeStyle: "" });
  }

  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <nav id="sidebar" ref="sidebar" className={this.state.activeStyle}>
            <div className="sidebar-header">
              <h3>Kategorier</h3>
            </div>
            <ul className="list-unstyled components">
              {this.props.categories.map(cat => (
                <li key={cat} onClick={this.props.setFilter(cat)}>
                  <div className="filter-item">{cat}</div>
                </li>
              ))}
            </ul>
          </nav>

          <div id="content">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <button
                  type="button"
                  id="sidebarCollapse"
                  className="btn btn-info"
                  onClick={this.showMenu}
                >
                  <i className="fas fa-align-left" />
                  <span>Toggle Sidebar</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
        <style jsx>
          {`
            .wrapper {
              display: flex;
              align-items: stretch;
            }

            #sidebar {
              min-width: 250px;
              max-width: 250px;
              min-height: 100vh;
              background: #e0e0e0;
              color: #fff;
              transition: all 0.3s;
            }

            #sidebar.active {
              margin-left: -250px;
            }

            @media (max-width: 768px) {
              #sidebar {
                margin-left: -250px;
              }

              #sidebar.active {
                margin-left: 0;
              }
            }

            p {
              font-size: 1em;
              font-weight: 300;
              line-height: 1.7em;
              color: #999;
            }

            a,
            a:hover,
            a:focus {
              color: inherit;
              text-decoration: none;
              transition: all 0.3s;
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
              color: #7386d5;
              background: #fff;
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}
