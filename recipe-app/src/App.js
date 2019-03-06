import React, { Component /*, Modal, Button */ } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import logo from "./logo.svg";

import "bootstrap/dist/css/bootstrap.min.css";

import RecipeList from "./component/recipe-list.component";
import EditRecipe from "./component/edit-recipe.component";
import CreateRecipe from "./component/create-recipe.component.js";
import Login from "./component/login.component";
import RecipeRead from "./component/read-recipe.component";
import Sidebar from "./component/sidebar.component";

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      modalShow: false,
      isShowing: false,
      recipe: null,
      filter: []
    };

    this.showRecipe = this.showRecipe.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  showRecipe(recipe) {
    this.setState({
      isShowing: true,
      recipe: recipe
    });
  }

  setFilter(category) {
    if (this.state.filter.includes(category)) {
      this.state.filter.splice(category);
    } else {
      this.setState(prevVal => ({
        filter: [...prevVal.filter, category]
      }));
    }
  }

  render() {
    let cats = ["Kött", "Kyckling", "Fisk", "Vegetariskt", "Vegan"];
    //let modalClose = () => this.setState({ modalShow: false });
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/" target="_blank">
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
          <Sidebar categories={cats} setFilter={this.setFilter} />
          <br />
          <Route
            path="/"
            exact
            render={props => <RecipeList method={this.showRecipe} />}
          />
          <Route path="/edit/:id" component={EditRecipe} />
          <Route path="/create" component={CreateRecipe} />
          <Route path="/login" component={Login} />
          <Route
            path="/recipe"
            render={props => <RecipeRead recipe={this.state.recipe} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
