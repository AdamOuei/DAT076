import React, { Component } from "react";
import axios from "axios";
import MiniRecipe from "./recipe-miniature.component";

export default class RecipeList extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipes: {},
      isLoaded: false,
    }
  }

  componentDidMount(){
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    fetch("http://localhost:4000/api/recipe/recipes")
      .then(data => data.json())
      .then(res => 
        this.setState({ recipes: res.data, isLoaded: true }));
  };

  render() {
    if(!this.state.isLoaded) return (<div>Loading...</div>);
    return (
      <div>
        {this.state.recipes.map(recipe => (<MiniRecipe key={recipe._id} id={recipe._id} />))}
      </div>
    );
  }
}
