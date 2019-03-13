import React, { Component } from "react";
import { Button, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import axios from "axios";
import "../styles/Register.css";
import { Link } from "react-router-dom";
import { AppContext } from "../AppProvider";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
      msg: ""
    };
  }

  /**
   * Make sure user has entered text
   */
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  /**
   * Adds a user to the database
   *
   */
  handleSubmit = event => {
    axios
      .post("http://localhost:4000/api/user/add", {
        id: 50,
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
      .then(res => res.request.response)
      .then(res => {
        if (!JSON.parse(res).success) {
          this.setState({ msg: JSON.parse(res).message });
          console.log(JSON.parse(res).message);
        } else {
          this.context.isLoggedIn = true;
          this.context.user.name = this.state.name;
          this.context.user.email = this.state.email;
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userName", this.context.user.name);
          localStorage.setItem("userEmail", this.context.user.email);
          this.props.history.push("/");
        }
      });
    event.preventDefault();
  };

  render() {
    return (
      <div className="Register">
        <p>{this.state.msg}</p>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="name" bsize="large">
            <FormLabel>Name</FormLabel>
            <FormControl
              type="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            block
            bsize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Submit
          </Button>
        </form>
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </div>
    );
  }
}

Register.contextType = AppContext;
