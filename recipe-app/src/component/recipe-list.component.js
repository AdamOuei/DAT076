import React, { Component } from "react";
import MiniRecipe from "./recipe-miniature.component";
import { AppContext } from "../AppProvider";

export default class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: {},
      isLoaded: false
    };
  }

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    fetch("http://localhost:4000/api/recipe/recipes")
      .then(data => data.json())
      .then(res => this.setState({ recipes: res.data, isLoaded: true }));
  };

  render() {
    if (!this.state.isLoaded) return <div>Loading...</div>;
    //TODO: Make the recipes show in a table instead of a long list (?)
    return (
      <div>
        <AppContext.Consumer>
          {context => <p>Hej {context.user.name}!</p>}
        </AppContext.Consumer>

        {this.state.recipes.map(recipe => (
          <MiniRecipe
            key={recipe._id}
            recipe={recipe}
            method={this.props.method}
          />
        ))}
      </div>
    );
  }
}

RecipeList.context = AppContext;
