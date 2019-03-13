import React, { Component } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import axios from "axios";
import { AppContext } from "../AppProvider";
import {
    Button,
    FormGroup,
    FormControl,
    FormLabel,
    Row,
    Col
} from "react-bootstrap";
import { Redirect } from "react-router-dom";

import "../styles/CreateRecipe.css";

export default class CreateRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            ingredients: "",
            instructions: "",
            categories: {},
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Takes the values from the event and changes the state according to id
     */
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };
    /**
     * Takes values from a multiselect and sets categorie state to the selected options
     */
    handleOptions = selectedOptions => {
        this.setState({
            categories: selectedOptions
        });
    };

    /**
     * Check if there is text written
     */
    validateForm() {
        return (
            this.state.title.length > 0 &&
            this.state.ingredients.length > 0 &&
            this.state.instructions.length > 0 &&
            this.state.categories.length > 0
        );
    }

    /**
     * Adds the recipes into the database
     */
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
                    axios.post(
                        "http://localhost:4000/api/user/addCreatedRecipe",
                        {
                            email: this.context.user.email,
                            _id: JSON.parse(res).data._id
                        }
                    );
                }
            });
        event.preventDefault();
        this.setState({ redirect: true });
    };

    /**
     * Getter for options for the multiselectbox
     */
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
        // Redirect user to homepage when created a recipe
        if (this.state.redirect) return <Redirect to="/" />;
        return (
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
                                    <Row>
                                        <Col>
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
                                        </Col>
                                        <Col>
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
                                        </Col>
                                    </Row>
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
                                <Button
                                    bsize="large"
                                    disabled={!this.validateForm()}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateRecipe.contextType = AppContext;
