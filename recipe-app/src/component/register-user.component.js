import React, { Component } from "react";
import { Button, FormGroup, FormLabel, FormControl } from "react-bootstrap";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: ""
    };
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };
  render() {
    return (
      <div className="Register">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="name" bSize="large">
            <FormLabel>Name</FormLabel>
            <FormControl
              type="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            block
            bSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
