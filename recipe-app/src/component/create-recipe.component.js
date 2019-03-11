import React, { Component } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import axios from "axios";
import { AppContext } from "../AppProvider";

import "../styles/CreateRecipe.css";

const options = [
  { label: "Kyckling", value: 1 },
  { label: "Vegetariskt", value: 2 },
  { label: "Grekiskt", value: 3 },
  { label: "Fisk", value: 4 },
  { label: "Asiatiskt", value: 5 }
];

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
    event.preventDefault();
  };

  render() {
    const { selectedOptions } = this.state.categories;
    return (
      /*TODO: Make into a form so that we can setStates above*/

      <div>
        <p>Create Recipe</p>
        <div className="recipeContainer">
          <div className="row mt-5">
            <div className="col-sm-12">
              <form onSubmit={this.handleSubmit}>
                <label>
                  Title:
                  <input
                    className="test"
                    id="title"
                    type="text"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </label>
                <br />
                <label>
                  Ingredients:
                  <textarea
                    className="test"
                    id="ingredients"
                    value={this.state.ingredients}
                    onChange={this.handleChange}
                  />
                </label>
                <br />

                <label>
                  Instructions:
                  <textarea
                    className="test"
                    id="instructions"
                    value={this.state.instructions}
                    onChange={this.handleChange}
                  />
                </label>
                <br />

                <label>
                  Category:
                  <ReactMultiSelectCheckboxes
                    value={selectedOptions}
                    onChange={this.handleOptions}
                    options={options}
                  />
                </label>
                <br />
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateRecipe.contextType = AppContext;
