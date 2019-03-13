import React, { Component } from "react";
import MiniRecipe from "./recipe-miniature.component";
import { AppContext } from "../AppProvider";
import { CardColumns } from "react-bootstrap";
import axios from "axios";
import { HamburgerButton } from "react-hamburger-button";
import "../styles/RecipeList.css";

export default class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: {},
      savedRecipes: [],
      open: true,
      isLoaded: false,
      savedLoaded: false
    };
    this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getSavedRecipes();
    this.getDataFromDb();
    this.props.showMenu();
  }

  componentWillUnmount() {
    this.props.closeMenu();
  }

  isRecipeSaved(id) {
    for (let i = 0; i < this.state.savedRecipes.length; i++) {
      if (this.state.savedRecipes[i] === id) {
        return true;
      }
    }
    return false;
  }

  getSavedRecipes() {
    axios
      .post("http://localhost:4000/api/user/getUserInfo", {
        email: localStorage.getItem("userEmail")
      })
      .then(res => res.request.response)
      .then(res => {
        if (JSON.parse(res).data !== null) {
          this.setState({
            savedRecipes: JSON.parse(res).data.saved,
            savedLoaded: true
          });
        } else {
          this.setState({
            savedLoaded: true
          });
        }
      });
  }

  handleClick() {
    this.props.showMenu();
    this.setState({
      open: !this.state.open
    });
  }

  getDataFromDb = () => {
    fetch("http://localhost:4000/api/recipe/recipes")
      .then(data => data.json())
      .then(res => {
        this.setState({ recipes: res.data, isLoaded: true });
      });
  };

  formatCategories() {
    let res = [];
    this.props.categories.forEach(element => {
      res.push(element.category);
    });
    return res;
  }

  render() {
    let filter =
      this.props.filter.length < 1
        ? this.formatCategories()
        : this.props.filter;
    if (this.context.isLoggedIn || !this.state.savedLoaded)
      return <div>Loading...</div>;
    return (
      <div>
        <div className="wrapper">
          <div id="hamburger">
            <HamburgerButton
              open={this.state.open}
              onClick={this.handleClick.bind(this)}
              width={18}
              height={15}
              strokeWidth={1}
              color="black"
              animationDuration={0.5}
            />
          </div>
          <div id="user">
            <AppContext.Consumer>
              {context => {
                if (context.isLoggedIn) {
                  return <p>Welcome {context.user.name}!</p>;
                } else {
                  return <p>Please login to enjoy all our awesome features</p>;
                }
              }}
            </AppContext.Consumer>
          </div>
        </div>
        <CardColumns>
          {this.state.recipes
            .filter(recipe =>
              recipe.category.some(cat => filter.indexOf(cat.label) >= 0)
            )
            .map(recipe => (
              <MiniRecipe
                key={recipe._id}
                recipe={recipe}
                method={this.props.method}
                saved={this.isRecipeSaved(recipe._id)}
              />
            ))}
        </CardColumns>

        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
          crossOrigin="anonymous"
        />
      </div>
    );
  }
}

RecipeList.context = AppContext;
