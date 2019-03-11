import React, { Component } from "react";
import MiniRecipe from "./recipe-miniature.component";
import { AppContext } from "../AppProvider";
import { CardColumns } from "react-bootstrap";
import axios from "axios";

export default class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: {},
      savedRecipes: [],
      isLoaded: false,
      savedLoaded: false
    };
  }

  componentDidMount() {
    this.getSavedRecipes();
    this.getDataFromDb();
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
        this.setState({
          savedRecipes: JSON.parse(res).data.saved,
          savedLoaded: true
        });
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
    if (!this.state.isLoaded || !this.state.savedLoaded)
      return <div>Loading...</div>;
    return (
      <div>
        <AppContext.Consumer>
          {context => <p>Hej {context.user.name}!</p>}
        </AppContext.Consumer>
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
      </div>
    );
  }
}

RecipeList.context = AppContext;
