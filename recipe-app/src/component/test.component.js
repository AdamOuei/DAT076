import React, { Component } from "react";
import { FormGroup, FormControl, FormLabel, Button, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lEmail: "",
            lPassword: "",
            rName: "",
            rEmail: "",
            rPassword: "",
            dEmail: "",
            cTitle: "",
            cIngredients: "",
            cInstructions: "",
            categories: {},
            result: "",
            isLoaded: false
        }

        this.getCategories();
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleLoginSubmit = event => {
        try {
            axios
                .post("http://localhost:4000/api/user/get", {
                    email: this.state.lEmail,
                    password: this.state.lPassword
                })
                .then(res => res.request.response)
                .then(res => this.setResult(res));
        } catch (error) {
            console.log(error);
        }
        event.preventDefault();
    }

    handleRegisterSubmit = event => {
        axios
            .post("http://localhost:4000/api/user/add", {
                email: this.state.rEmail,
                password: this.state.rPassword,
                name: this.state.rName
            })
            .then(res => res.request.response)
            .then(res => this.setResult(res));
        event.preventDefault();
    };

    handleCreateRecipeSubmit = event => {
        axios
            .post("http://localhost:4000/api/recipe/add", {
                title: this.state.cTitle,
                ingredients: this.state.cIngredients,
                instructions: this.state.cInstructions,
                category: this.state.categories
            })
            .then(res => res.request.response)
            .then(res => this.setResult(res));
        event.preventDefault();
    };

    handleOptions = selectedOptions => {
        this.setState({
            categories: selectedOptions
        });
    };

    getOptions = () => {
        let options = [];
        var i = 1;
        this.state.categories.forEach(element => {
            options.push({ label: element.category, value: i });
            i++;
        });
        return options;
    }

    getCategories = () => {
        fetch("http://localhost:4000/api/category/categories")
            .then(data => data.json())
            .then(res => this.setState({ categories: res.data, isLoaded: true }));
    };

    handleDeleteUserSubmit = event => {
        axios
            .post("http://localhost:4000/api/user/deleteUser", {
                email: this.state.email
            }).then(res => res.request.response)
            .then(res => this.setResult(res));
        event.preventDefault();
    };

    getAllUsers = event => {
        console.log("Hellu")
        axios.get("http://localhost:4000/api/user/users")
            .then(res => res.request.response)
            .then(res => this.setResult(res))
    }

    getAllRecipes = event => {
        axios.get("http://localhost:4000/api/recipe/recipes")
            .then(res => res.request.response)
            .then(res => this.setResult(res))
    }

    setResult = result => {
        this.setState({
            result: result
        })
    }

    render() {
        const { selectedOptions } = this.state.categories;
        if (!this.state.isLoaded) return <div>Loading...</div>
        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col>
                            <h3>Login test</h3>
                            <div className="LoginUserTest">
                                <form onSubmit={this.handleLoginSubmit}>
                                    <FormGroup>
                                        <FormLabel><p>Email</p></FormLabel>
                                        <FormControl
                                            id="lEmail"
                                            value={this.state.lEmail}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel><p>Password</p></FormLabel>
                                        <FormControl
                                            id="lPassword"
                                            value={this.state.lPassword}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                    <Button type="submit">Login</Button>
                                </form>
                            </div>
                        </Col>
                        <Col>
                            <h3>Register test</h3>
                            <div className="RegisterUserTest">
                                <form onSubmit={this.handleRegisterSubmit}>
                                    <FormGroup>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl
                                            id="rEmail"
                                            value={this.state.rEmail}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl
                                            id="rPassword"
                                            value={this.state.rPassword}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl
                                            id="rName"
                                            value={this.state.rName}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                    <Button type="submit">Submit</Button>
                                </form>
                            </div>
                        </Col>
                        <Col>
                            <h3>Delete user test</h3>
                            <div className="DeleteUserTest">
                                <form onSubmit={this.handleDeleteUserSubmit}>
                                    <FormGroup>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl
                                            id="dEmail"
                                            value={this.state.dEmail}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                    <Button type="submit">Delete</Button>
                                </form>
                            </div>
                        </Col>
                        <Col>
                            <h3>Create recipe test</h3>
                            <div className="CreateRecipeTest">
                                <form onSubmit={this.handleCreateRecipeSubmit}>
                                    <FormGroup bsize="large">
                                        <FormLabel>Title</FormLabel>
                                        <FormControl
                                            id="cTitle"
                                            value={this.state.cTitle}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Ingredients</FormLabel>
                                        <FormControl
                                            id="cIngredients"
                                            as="textarea"
                                            rows="3"
                                            type="text"
                                            value={this.state.cIngredients}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Instructions</FormLabel>
                                        <FormControl
                                            id="cInstructions"
                                            as="textarea"
                                            rows="3"
                                            type="text"
                                            value={this.state.cInstructions}
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
                                    <Button
                                        block
                                        bsize="large"
                                        type="submit"
                                    >
                                        Submit
                                </Button>
                                </form>
                            </div>
                        </Col>
                        <Col>
                            <h3>Get test</h3>
                            <Button onClick={this.getAllUsers}>Get all users</Button>
                            <Button onClick={this.getAllRecipes}>Get all recipes</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="ResultTest">
                                <h3>Result</h3>
                                <p>{this.state.result}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

export default Test;