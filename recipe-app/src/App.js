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
            categories: []
        };

        this.showRecipe = this.showRecipe.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.showMenu = this.showMenu.bind(this);
    }

    componentWillUpdate() {}

    showRecipe(recipe) {
        this.setState({
            isShowing: true,
            recipe: recipe
        });
    }

    componentDidMount() {
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

    render() {
        let cats = ["Kött", "Kyckling", "Fisk", "Vegetariskt", "Vegan"];
        //let modalClose = () => this.setState({ modalShow: false });
        return (
            <AppProvider>
                <Router>
                    <div className="nopadding">
                        <NavBar showMenu={this.showMenu} />
                        <div>
                            <div className="wrapper">
                                <SideBar
                                    cats={cats}
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
                                                        filter={
                                                            this.state.filter
                                                        }
                                                        categories={cats}
                                                    />
                                                )}
                                            />
                                            <Route
                                                path="/edit/:id"
                                                component={EditRecipe}
                                            />
                                            <Route
                                                path="/create"
                                                component={CreateRecipe}
                                            />
                                            <Route
                                                path="/login"
                                                component={Login}
                                            />
                                            <Route
                                                path="/userProfile"
                                                component={UserProfile}
                                            />
                                            <Route
                                                path="/editUser"
                                                component={EditUser}
                                            />
                                            <Route
                                                path="/register"
                                                component={Register}
                                            />
                                            <Route
                                                path="/recipe"
                                                render={props => (
                                                    <RecipeRead
                                                        recipe={
                                                            this.state.recipe
                                                        }
                                                    />
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
