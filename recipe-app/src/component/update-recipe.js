import React, { Component } from "react";
import axios from "axios";
import { Form, Row, Col } from "react-bootstrap";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import {
    Button,
    FormGroup,
    FormControl,
    FormLabel,
  } from "react-bootstrap";

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
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    componentDidMount(){
        this.setRecipeValues();
    }

    setRecipeValues(){
        this.setState({
            title: this.props.recipe.title,
            ingredients: this.props.recipe.ingredients,
            instructions: this.props.recipe.instructions
        });
    }

    handleCategoryChange = selectedOptions => {
        console.log(selectedOptions);

        this.setState({
            categories: selectedOptions
        });
    };

    handleChange(event) {
       
            this.setState({
                [event.target.id]: event.target.value
              });
        
      }

    handleSubmit = event => {
        console.log("Submit clicked!");
        
        axios
            .post("http://localhost:4000/api/recipe/update", {
                _id: this.props.recipe._id,
                title: this.state.title,
                ingredients: this.state.ingredients,
                instructions: this.state.instructions,
               // categories: this.state.categories
            })
            .then(res => {
                this.setState({
                    title: res.data.title,
                    ingredients: res.data.ingredients,
                    instructions: res.data.instructions,
                  //  category: res.data.categories
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
                <h2>Update Recipe</h2>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-sm-12">
                            <form onSubmit={this.handleSubmit}>
                                <FormGroup controlId="title">
                                <FormLabel column sm="2">
                                    Title
                                </FormLabel>
                                <FormControl
                                    type="text"
                                    
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                 />

                                </FormGroup>
                                <FormGroup controlId="ingredients">
                                    <FormLabel column sm="2">
                                      Ingredients
                                    </FormLabel>
                                    <FormControl 
                                        as="textarea" 
                                        rows="3" 
                                        type="text"
                                        value={this.state.ingredients}
                                        onChange={this.handleChange}
                                        />
                                </FormGroup>
                                <FormGroup controlId="instructions">
                                    <FormLabel column sm="2">
                                        Instructions
                                    </FormLabel>
                                    <FormControl 
                                        as="textarea" 
                                        rows="3" 
                                        className="test"

                                        value={this.state.instructions}
                                        onChange={this.handleChange}
                                        />
                                </FormGroup>
                                <FormGroup controllId="category">
                                    <FormLabel column sm="2">
                                        Category
                                    </FormLabel>
                                    <ReactMultiSelectCheckboxes
                                        value={selectedOptions}
                                        onChange={this.handleCategoryChange}
                                        options={this.getOptions()}
                                    />
                                
                                </FormGroup>
                                <Button
                                    block
                                    bsize="large"
                                    //disabled={!this.validateForm()}
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

export default UpdateRecipe;