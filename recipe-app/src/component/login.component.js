import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Register from "./register-user.component";
import "../styles/Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
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
      <Router>
        <div className="Login">
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
            <Button
              block
              bSize="large"
              disabled={!this.validateForm()}
              type="submit"
            >
              Login
            </Button>
            <Link to="/register" className="nav-link">
              Sign Up
            </Link>

            <Route path="/register" component={Register} />
          </form>
        </div>
      </Router>
    );
  }
}
