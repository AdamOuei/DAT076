import React, { Component } from "react";
import axios from "axios";
import { Form, Row, Col } from "react-bootstrap";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

class UpdateRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            ingredients: "",
            instructions: "",
            category: "",
            categories: this.props.recipe.category
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = selectedOptions => {
        console.log(selectedOptions);

        this.setState({
            categories: selectedOptions
        });
    };

    handleSubmit = event => {
        axios
            .post("http://localhost:4000/api/recipe/update", {
                title: this.state.title,
                ingredients: this.state.ingredients,
                instructions: this.state.instructions
            })
            .then(res => {
                this.setState({
                    title: res.data.title,
                    ingredients: res.data.ingredients,
                    instructions: res.data.instructions
                });
            });
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
        console.log(this.state.categories);

        const selectedOptions = this.state.categories;
        return (
            <div>
                <p>Update Recipe</p>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-sm-12">
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    Title:
                                    <input
                                        id="title"
                                        type="text"
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                        placeholder={this.props.recipe.title}
                                    />
                                </label>
                                <br />
                                <label>
                                    Ingredients:
                                    <textarea
                                        id="ingredients"
                                        value={this.state.ingredients}
                                        onChange={this.handleChange}
                                        placeholder={
                                            this.props.recipe.ingredients
                                        }
                                    />
                                </label>
                                <br />

                                <label>
                                    Instructions:
                                    <textarea
                                        id="instructions"
                                        value={this.state.instructions}
                                        onChange={this.handleChange}
                                        placeholder={
                                            this.props.recipe.instructions
                                        }
                                    />
                                </label>
                                <br />

                                <label>
                                    Category:
                                    <ReactMultiSelectCheckboxes
                                        value={selectedOptions}
                                        onChange={this.handleChange}
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

export default UpdateRecipe;
