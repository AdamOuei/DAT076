import React, { Component } from "react";
import photo from "./recipePhotos/default.jpg";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    return (
      <div>
        <div>
          <img src={photo} width="450px" alt="logo" />
        </div>
        <div>
          <h2>{this.state.title}</h2>
        </div>
        <div>
        <b>Ingredients: </b>
          <p>{this.state.ingredients}</p>
        </div>
        <div>
          <b>Instructions: </b>
          <p>{this.state.instructions}</p>
        </div>
        <div>
          <b>Categories: </b>
          {this.state.categories.map(cat => (
            <p key={cat._id}>{cat.label}</p>
          ))}
        </div>
        <div>
        <Button variant="primary">
            <Link to="/" style={{ color: "white" }}>
              Back
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}
