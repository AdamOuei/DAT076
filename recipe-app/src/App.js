import React, { Component /*, Modal, Button */ } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import RecipeList from "./component/recipe-list.component";
import EditRecipe from "./component/edit-recipe.component";
import CreateRecipe from "./component/create-recipe.component.js";
import Login from "./component/login.component";
import RecipeRead from "./component/read-recipe.component";
import UserProfile from "./component/user-profile.component.js";
import AppProvider, { AppContext } from "./AppProvider";
import NavBar from "./component/navbar.component";
import EditUser from "./component/edit-user";
import Register from "./component/register-user.component";
import SideBar from "./component/sidebar.component";

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      modalShow: false,
      isShowing: false,
      recipe: null,
      filter: [],
      activeStyle: "",
      authenticated: false,
      categories: [],
      isLoaded: false
    };

    this.showRecipe = this.showRecipe.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }

  componentWillUpdate() {}

  showRecipe(recipe) {
    this.setState({
      isShowing: true,
      recipe: recipe
    });
  }

  componentDidMount() {
    this.getCategories();
    if (localStorage.getItem("isLoggedIn") === "true") {
    } else {
      console.log(localStorage.getItem("isLoggedIn"));
    }
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

  getCategories = () => {
    fetch("http://localhost:4000/api/category/categories")
      .then(data => data.json())
      .then(res => this.setState({ categories: res.data, isLoaded: true }));
  };

  render() {
    //let modalClose = () => this.setState({ modalShow: false });
    if (!this.state.isLoaded) return <div>Loading</div>;
    return (
      <AppProvider>
        <Router>
          <div className="nopadding">
            <NavBar showMenu={this.showMenu} />
            <div>
              <div className="wrapper">
                <SideBar
                  cats={this.state.categories}
                  setFilter={this.setFilter.bind(this)}
                  activeStyle={this.state.activeStyle}
                />
                <div id="content">
                  <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                      <Route
                        path="/"
                        exact
                        render={props => (
                          <RecipeList
                            method={this.showRecipe}
                            filter={this.state.filter}
                            categories={this.state.categories}
                          />
                        )}
                      />
                      <Route path="/edit/:id" component={EditRecipe} />
                      <Route
                        path="/create"
                        exact
                        render={props => (
                          <CreateRecipe categories={this.state.categories} />
                        )}
                      />
                      <Route path="/login" component={Login} />
                      <Route path="/userProfile" component={UserProfile} />
                      <Route path="/editUser" component={EditUser} />
                      <Route path="/register" component={Register} />
                      <Route
                        path="/recipe"
                        render={props => (
                          <RecipeRead recipe={this.state.recipe} />
                        )}
                      />
                    </div>
                  </nav>
                </div>
              </div>
              <style>
                {`
                              .wrapper {
                                display: flex;
                                align-items: stretch;
                              }
                            `}
              </style>
            </div>
          </div>
        </Router>
      </AppProvider>
    );
  }
}

App.contextType = AppContext;

export default App;
