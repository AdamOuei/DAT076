import React, { Component } from "react";
import axios from "axios";
import MiniRecipe from "./recipe-miniature.component";
import { BrowserRouter as Router, Route } from "react-router-dom";
import EditUser from "./edit-user";
import { AppContext } from "../AppProvider";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { CardColumns } from "react-bootstrap";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      saved: [],
      savedRecipes: [],
      created: [],
      createdRecipes: [],
      createMessage: "",
      saveMessage: ""
    };
  }

  /**
   * Fetches current users saved and created recipe IDs and adds them to state
   */
  getUsersRecipies() {
    try {
      axios
        .post("http://localhost:4000/api/user/getUserInfo", {
          email: this.context.user.email
        })
        .then(res => res.request.response)
        .then(res => {
          var result = JSON.parse(res).data;
          this.setState({
            email: result.email,
            saved: result.saved,
            created: result.created
          });
          this.setSavedRecipes();
          this.setCreatedRecipes();
        });
    } catch (error) {
      console.log(error);
    }
  }

  //Get whole recipes from the users saved id
  setSavedRecipes() {
    if (this.state.saved.length === 0) {
      this.setState({
        saveMessage: "Nothing to show, save recipes in order to make them show."
      });
    }
    for (var i = 0; i < this.state.saved.length; i++) {
      this.getRecipeById(this.state.saved[i], "saved");
    }
  }

  //Get whole recipes from the users created id
  setCreatedRecipes() {
    if (this.state.created.length === 0) {
      this.setState({
        createMessage:
          "Nothing to show, create your own recipes in order to make them show."
      });
    }
    for (var i = 0; i < this.state.created.length; i++) {
      this.getRecipeById(this.state.created[i], "created");
    }
  }

  //Get recipes by id
  getRecipeById(num, type) {
    axios
      .post("http://localhost:4000/api/recipe/getRecipeById", {
        _id: num
      })
      .then(res => {
        if (type === "saved") {
          this.setState({
            savedRecipes: this.state.savedRecipes.concat(res.data)
          });
        } else {
          console.log(res.data);
          this.setState({
            createdRecipes: this.state.createdRecipes.concat(res.data)
          });
        }
      });
  }

  componentDidMount() {
    if (this.context.isLoggedIn) {
      this.getUsersRecipies();
    }
  }

  render() {
    /**
     * If the user is not logged in it shouldn't be able to get to this page
     * therefore redirects it to /
     */
    if (!this.context.isLoggedIn) return <Redirect to="/" />;
    return (
      <div id="userProfile">
        <div id="UserInfo">
          <h1>User Info</h1>
          <h3 id="userName">{this.state.name}</h3>
          <p>Email: {this.state.email}</p>
          <Router>
            <div>
              <Button variant="primary">
                <Link to="/editUser" style={{ color: "white" }}>
                  Edit user
                </Link>
              </Button>
              <Route
                path="/editUser"
                render={props => <EditUser refresh={this.props.refresh} />}
              />
            </div>
          </Router>
        </div>
        <div id="saved">
          <h1>Saved recipes</h1>
          <div>
            <p>{this.state.saveMessage}</p>
            <CardColumns>
              {this.state.savedRecipes.map(recipe => (
                <MiniRecipe
                  key={recipe.data._id}
                  recipe={recipe.data}
                  method={this.props.method}
                  saved={true}
                />
              ))}
            </CardColumns>
          </div>
        </div>
        <div id="created">
          <h1>Recipes created by you</h1>
          <div>
            <p>{this.state.createMessage}</p>
            <CardColumns>
              {this.state.createdRecipes.map(recipe => (
                <MiniRecipe
                  key={recipe.data._id}
                  recipe={recipe.data}
                  method={this.props.method}
                />
              ))}
            </CardColumns>
          </div>
        </div>
      </div>
    );
  }
}

UserProfile.contextType = AppContext;
