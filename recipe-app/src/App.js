import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import logo from './logo.svg';

import "bootstrap/dist/css/bootstrap.min.css";

import RecipeList from './component/recipe-list.component'
import EditRecipe from './component/edit-recipe.component'
import CreateRecipe from './component/create-recipe.component.js'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <h2>MERN-stack recipe app</h2>
        </div>
        <Route path="/" exact component={RecipeList} />
        <Route path="/edit/:id" component={EditRecipe} />
        <Route path="/create" component={CreateRecipe} /> 
      </Router>
    );
  }
}

export default App;
