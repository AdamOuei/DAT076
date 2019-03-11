import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "../styles/Login.css";
import axios from "axios";
import { AppContext } from "../AppProvider.js";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            loggedIn: false,
            msg: ""
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
                        this.setState({ msg: "" });
                        this.props.history.push("/");
                        localStorage.setItem("isLoggedIn", this.state.loggedIn);
                        localStorage.setItem(
                            "userName",
                            this.context.user.name
                        );
                        localStorage.setItem(
                            "userEmail",
                            this.context.user.email
                        );
                    } else {
                        this.setState({ msg: JSON.parse(res).message });
                    }
                });
        } catch (error) {
            console.log(error);
        }

        event.preventDefault();
    };

    render() {
        return (
            <div className="Login">
                <p id="errorMsg">{this.state.msg}</p>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsize="large ">
                        <FormLabel>
                            <p>Email</p>
                        </FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsize="large">
                        <FormLabel>
                            <span>Password</span>
                        </FormLabel>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <Button block disabled={!this.validateForm()} type="submit">
                        <span>Login</span>
                    </Button>
                    <Link to="/register" className="nav-link">
                        <span>Sign Up</span>
                    </Link>
                </form>
            </div>
        );
    }
}

Login.contextType = AppContext;
