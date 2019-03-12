import React, { Component } from "react";
import axios from "axios";
import { AppContext } from "../AppProvider";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Col
} from "react-bootstrap";

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    axios
      .post("http://localhost:4000/api/user/getUserInfo", {
        email: this.context.user.email
      })
      .then(res => res.request.response)
      .then(res => {
        let user = JSON.parse(res).data;
        console.log(user);
        this.setState({
          name: user.name,
          email: user.email,
          password: user.password
        });
      });
  }

  componentDidUpdate() {
    this.checkIfLoggedIn();
  }

  componentWillMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    if (!this.context.isLoggedIn) {
      this.props.history.push("/");
    }
  }

  handleChange(event) {
   
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    
    axios.post("http://localhost:4000/api/user/update", {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-12">
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="formPlaintextEmail">
                <FormLabel column sm="2">
                  Email
                </FormLabel>
                <Col sm="10">
                  <FormControl
                    plaintext
                    readOnly
                    defaultValue={this.state.email}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="password">
                <FormLabel column sm="2">
                  Password
                </FormLabel>
                <Col sm="4">
                  <FormControl
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="name">
                <FormLabel column sm="2">
                  Name
                </FormLabel>
                <Col sm="4">
                  <FormControl
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </Col>
              </FormGroup>
              {/*Try to center this one*/}
              <Button column sm="2" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  /*  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-12">
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input
                  id="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder={this.state.name}
                />
              </label>
              <br />
              <label>Email: {this.state.email}</label>
              <br />
              <label>
                Password:
                <input
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder={this.state.password}
                />
              </label>
              <br />
              <input type="submit" value="Update" />
            </form>
          </div>
        </div>
      </div>
    );
  }*/
}

EditUser.contextType = AppContext;

export default EditUser;
