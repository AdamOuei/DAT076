import React, { Component /*, Modal, Button */ } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import RecipeList from "./component/recipe-list.component";
import EditRecipe from "./component/edit-recipe.component";
import CreateRecipe from "./component/create-recipe.component.js";
import Login from "./component/login.component";
import RecipeRead from "./component/read-recipe.component";
import ListItem from "./component/sidebarItem.component";
import UserProfile from "./component/user-profile.component.js";
import AppProvider, { AppContext } from "./AppProvider";
import NavBar from "./component/navbar.component";
import EditUser from "./component/edit-user";
import Register from "./component/register-user.component";

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

  componentWillUpdate() { }

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
                <nav
                  id="sidebar"
                  ref="sidebar"
                  className={this.state.activeStyle}
                >
                  <div className="sidebar-header">
                    <h3>Kategorier</h3>
                  </div>
                  <ul className="list-unstyled components">
                    {cats.map(cat => (
                      <ListItem
                        key={cat}
                        item={cat}
                        setFilter={this.setFilter.bind(this)}
                      />
                    ))}
                  </ul>
                </nav>
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
                            categories={cats}
                          />
                        )}
                      />
                      <Route path="/edit/:id" component={EditRecipe} />
                      <Route path="/create" component={CreateRecipe} />
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
              color: #aaaaaa;
              background: #fff;
            }
          `}
              </style>
            </div>

          </div>
        </Router>
      </AppProvider>
      /*=======
                </nav>
                <br />
      
                <Route path="/" exact render={(props) => <RecipeList method={this.showRecipe}  />} />
                <Route path="/edit/:id" component={EditRecipe} />
                <Route path="/create" component={CreateRecipe} />
                <Route path="/login" component={Login} />
                <Route path="/recipe" render={(props) => <RecipeRead recipe={this.state.recipe}/>} />
              </div>
            </Router>
      >>>>>>> view
      */
    );
  }
}

App.contextType = AppContext;

export default App;
