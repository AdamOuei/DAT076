import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Register from "./register-user.component";
import "../styles/Login.css";
import axios from "axios";
import { AppContext } from "../AppProvider.js";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loggedIn: false
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

  validateLogin(input) {
    this.setState({
      loggedIn: input
    });
  }

  handleSubmit = async event => {
    console.log(this.context);
    try {
      axios
        .post("http://localhost:4000/api/user/get", {
          email: this.state.email,
          password: this.state.password
        })
        .then(res => res.request.response)
        .then(res => {
          console.log(res);
          let validate = JSON.parse(res).success;
          this.validateLogin(validate);
          this.context.isLoggedIn = this.state.loggedIn;
          this.context.user.name = JSON.parse(res).name;
          this.context.user.email = this.state.email;
          if (this.state.loggedIn) {
            this.props.history.push("/");
          }
        });
    } catch (error) {
      console.log(error);
    }

    event.preventDefault();
  };

  render() {
    return (
      <Router>
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bSize="large ">
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

            <Button block disabled={!this.validateForm()} type="submit">
              Login
            </Button>
            <Link to="/register" className="nav-link">
              Sign Up
            </Link>

            <Switch>
              <Route path="/register" component={Register} />
            </Switch>
          </form>
        </div>
      </Router>
    );
  }
}

Login.contextType = AppContext;
