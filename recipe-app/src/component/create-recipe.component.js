import React, { Component } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import axios from "axios";
import { AppContext } from "../AppProvider";

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
        console.log(event.target);
        this.setState({
            [event.target.id]: event.target.value
        });
    };

<<<<<<< HEAD
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
=======
    handleOptions = selectedOptions => {
        this.setState({
            categories: selectedOptions
        });
        console.log(`selected options: `, selectedOptions);
    };

    handleSubmit = event => {
        //TODO Fix id and category
        axios.post("http://localhost:4000/api/recipe/add", {
            id: 123,
            title: this.state.title,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions,
            category: this.state.categories
        });
        this.props.history.push("/");
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
>>>>>>> a97a2a3e7b85d2b419578882b219866c3401b33e

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
                                        options={this.getOptions()}
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
