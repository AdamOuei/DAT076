import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppProvider";
import { Button } from "@material-ui/core";

import logo from "../logo.svg";
import "../styles/NavBar.css";

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/" target="_blank">
          <img src={logo} width="30" height="30" alt="RecipeList" />
        </a>
        <Link to="/" className="navbar-brand">
          Recipe Site
        </Link>
        <div className="collpase navbar-collapse cool-class">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Recipes
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Create Recipe
              </Link>
            </li>
          </ul>
          <div className="friends">
            <AppContext.Consumer>
              {context =>
                context.isLoggedIn === false ? (
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                ) : (
                  <React.Fragment>
                    <Link to="/userProfile" className="nav-link">
                      {context.user.name}
                    </Link>
                    <Button onClick={context.removeUser}>Logout</Button>
                  </React.Fragment>
                )
              }
            </AppContext.Consumer>
          </div>
        </div>
      </nav>
    );
  }
}
