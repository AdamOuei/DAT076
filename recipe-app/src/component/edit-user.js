import React, { Component } from "react";
import axios from "axios";
import { AppContext } from '../AppProvider';
import App from "../App";

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
        console.log(user)
        this.setState({
          name: user.name,
          email: user.email,
          password: user.password
        });
      });
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
              <label>
                Email: {this.state.email}
              </label>
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
  }
}

EditUser.contextType = AppContext;

export default EditUser;
