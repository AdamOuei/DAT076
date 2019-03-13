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

  deleteUser = () => {
    axios
      .post("http://localhost:4000/api/user/deleteUser", {
        email: this.state.email
      })
      .then(this.props.history.push("/"))
      .then(this.context.removeUser());
  };

  handleSubmit(event) {
    axios.post("http://localhost:4000/api/user/update", {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    });
    this.props.history.push("/");
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
              <Button column sm="2" type="submit">
                Submit
              </Button>
              <Button variant="warning" onClick={this.deleteUser}>
                Delete
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditUser.contextType = AppContext;

export default EditUser;
