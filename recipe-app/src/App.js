import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import logo from "./logo.svg";

import "bootstrap/dist/css/bootstrap.min.css";

import RecipeList from "./component/recipe-list.component";
import EditRecipe from "./component/edit-recipe.component";
import CreateRecipe from "./component/create-recipe.component.js";
import Login from "./component/login.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/" target="_blank">
              <img src={logo} width="30" height="30" alt="RecipeList" />
            </a>
            <Link to="/" className="navbar-brand">
              Recipe Site
            </Link>
            <div className="collpase navbar-collapse">
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
                <li>
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/" exact component={RecipeList} />
          <Route path="/edit/:id" component={EditRecipe} />
          <Route path="/create" component={CreateRecipe} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
