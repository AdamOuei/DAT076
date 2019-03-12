import React, { Component } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import axios from "axios";
import { AppContext } from "../AppProvider";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../styles/CreateRecipe.css";

export default class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    /*Preliminary strings, change to lists if possible, or parse them*/
    this.state = {
      title: "",
      ingredients: "",
      instructions: "",
      categories: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleOptions = selectedOptions => {
    this.setState({
      categories: selectedOptions
    });
  };

  validateForm() {
    return (
      this.state.title.length > 0 &&
      this.state.ingredients.length > 0 &&
      this.state.instructions.length > 0
    );
  }

  handleSubmit = event => {
    axios
      .post("http://localhost:4000/api/recipe/add", {
        title: this.state.title,
        ingredients: this.state.ingredients,
        instructions: this.state.instructions,
        category: this.state.categories
      })
      .then(res => res.request.response)
      .then(res => {
        if (this.context.isLoggedIn) {
          axios.post("http://localhost:4000/api/user/addCreatedRecipe", {
            email: this.context.user.email,
            _id: JSON.parse(res).data._id
          });
        }
      });
    this.props.history.push("/");
    console.log("Outside of axios");

    event.preventDefault();
  };

  getOptions() {
    let options = [];
    var i = 1;
    this.props.categories.forEach(element => {
      options.push({ label: element.category, value: i });
      i++;
    });
    return options;
  }

  render() {
    const { selectedOptions } = this.state.categories;
    return (
      /*TODO: Make into a form so that we can setStates above*/

      <div>
        <h2>Create Recipe</h2>
        <div className="recipeContainer">
          <div className="row mt-5">
            <div className="col-sm-12">
              <form onSubmit={this.handleSubmit}>
                <FormGroup bsize="large">
                  <FormLabel column sm="2">
                    Title
                  </FormLabel>
                  <FormControl
                    className="test"
                    id="title"
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel column sm="2">
                    Ingredients
                  </FormLabel>
                  <FormControl
                    as="textarea"
                    rows="3"
                    className="test"
                    id="ingredients"
                    type="text"
                    value={this.state.ingredients}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel column sm="2">
                    Instructions
                  </FormLabel>
                  <FormControl
                    as="textarea"
                    rows="3"
                    className="test"
                    id="instructions"
                    value={this.state.instructions}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel column sm="2">
                    Category
                  </FormLabel>
                  <ReactMultiSelectCheckboxes
                    value={selectedOptions}
                    onChange={this.handleOptions}
                    options={this.getOptions()}
                  />
                </FormGroup>
                <Link to="/">
                  <Button
                    block
                    bsize="large"
                    disabled={!this.validateForm()}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateRecipe.contextType = AppContext;
