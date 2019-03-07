import React, { Component /*, Modal, Button */ } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import logo from "./logo.svg";

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
import { Button } from "@material-ui/core";
import EditUser from "./component/edit-user";
import Register from "./component/register-user.component";

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      modalShow: false,
      isShowing: false,
      recipe: null,
      authenticated: false
    };

    this.showRecipe = this.showRecipe.bind(this);
  }

  componentWillUpdate() {}

  componentDidMount() {
    if (localStorage.getItem("isLoggedIn") === "true") {
      console.log("enters here");
    } else {
      console.log("Failed lol get rekt");
      console.log(localStorage.getItem("isLoggedIn"));
    }
  }
  showRecipe(recipe) {
    this.setState({
      isShowing: true,
      recipe: recipe
    });
  }

  render() {
    //let modalClose = () => this.setState({ modalShow: false });
    return (
      <AppProvider>
        <Router>
          <div className="container ">
            <NavBar />
            <Switch>
              <Route
                path="/"
                exact
                render={props => <RecipeList method={this.showRecipe} />}
              />
              <Route path="/edit/:id" component={EditRecipe} />
              <Route path="/create" component={CreateRecipe} />
              <Route path="/login" component={Login} />
              <Route path="/userProfile" component={UserProfile} />
              <Route path="/editUser" component={EditUser} />
              <Route path="/register" component={Register} />
              <Route
                path="/recipe"
                render={props => <RecipeRead recipe={this.state.recipe} />}
              />
            </Switch>
          </div>
        </Router>
      </AppProvider>
    );
  }
}

App.contextType = AppContext;

export default App;
