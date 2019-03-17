import React, { Component /*, Modal, Button */ } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import RecipeList from "./component/recipe-list.component";
import UpdateRecipe from "./component/update-recipe";
import CreateRecipe from "./component/create-recipe.component.js";
import Login from "./component/login.component";
import RecipeRead from "./component/read-recipe.component";
import UserProfile from "./component/user-profile.component.js";
import AppProvider, { AppContext } from "./AppProvider";
import NavBar from "./component/navbar.component";
import EditUser from "./component/edit-user";
import Register from "./component/register-user.component";
import SideBar from "./component/sidebar.component";
import Test from "./component/test.component";

class App extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            modalShow: false,
            isShowing: false,
            recipe: null,
            filter: [],
            activeStyle: "active",
            authenticated: false,
            categories: [],
            isLoaded: false
        };

        this.showRecipe = this.showRecipe.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    componentWillUpdate() { }

    showRecipe(recipe) {
        this.setState({
            isShowing: true,
            recipe: recipe
        });
    }

    componentDidMount() {
        this.getCategories();
        if (localStorage.getItem("isLoggedIn") === "true") {
        }
    }

    checkLoggedIn = (nextState, replace) => {
        if (localStorage.getItem("isLoggedIn") === "false") {
            replace({
                pathname: "/"
            });
        }
    };
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

    refresh = () => {
        this.getCategories();
    };

    showMenu() {
        this.state.activeStyle === ""
            ? this.setState({ activeStyle: "active" })
            : this.setState({ activeStyle: "" });
    }

    closeMenu() {
        if (this.state.activeStyle === "") this.setState({ activeStyle: "active" });
    }

    getCategories = () => {
        fetch("http://localhost:4000/api/category/categories")
            .then(data => data.json())
            .then(res => this.setState({ categories: res.data, isLoaded: true }));
    };


    render() {
        if (!this.state.isLoaded) return <div>Loading</div>;
        return (
            <AppProvider>
                <Router>
                    <div className="nopadding">
                        <NavBar />
                        <div>
                            <div className="wrapper">
                                <div>
                                    <SideBar
                                        cats={this.state.categories}
                                        setFilter={this.setFilter.bind(this)}
                                        activeStyle={this.state.activeStyle}
                                    />
                                </div>
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
                                                        showMenu={this.showMenu}
                                                        closeMenu={this.closeMenu}
                                                    />
                                                )}
                                            />
                                            <Route
                                                path="/update/:id"
                                                exact
                                                render={props => (
                                                    <UpdateRecipe
                                                        recipe={this.state.recipe}
                                                        categories={this.state.categories}
                                                    />
                                                )}
                                            />
                                            <Route
                                                path="/create"
                                                exact
                                                render={props => (
                                                    <CreateRecipe categories={this.state.categories} />
                                                )}
                                            />
                                            <Route path="/login" component={Login} />
                                            <Route
                                                path="/userProfile"
                                                onEnter={this.checkLoggedIn}
                                                render={props => (
                                                    <UserProfile
                                                        method={this.showRecipe}
                                                        refresh={this.refresh}
                                                    />
                                                )}
                                            />
                                            <Route
                                                path="/test"
                                                component={Test}
                                            />
                                            <Route path="/editUser" component={EditUser} />
                                            <Route path="/register" component={Register} />
                                            <Route
                                                path="/recipe/:id"
                                                render={props => (
                                                    <RecipeRead recipe={this.state.recipe} />
                                                )}
                                            />
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </Router>
            </AppProvider>
        );
    }
}

App.contextType = AppContext;

export default App;
