import React, { Component } from "react";

export default class RecipeRead extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.recipe.title,
      ingredients: this.props.recipe.ingredients,
      instructions: this.props.recipe.instructions,
      categories: this.props.recipe.category
    };
  }

  render() {
    console.log(this.state.categories);

    return (
      <div>
        <div>
          <h2>{this.state.title}</h2>
        </div>
        <div>
          <p>{this.state.ingredients}</p>
        </div>
        <div>
          <p>{this.state.instructions}</p>
        </div>
        <div>
          {this.state.categories.map(cat => (
            <p key={cat._id}>{cat.label}</p>
          ))}
        </div>
      </div>
    );
  }
}
