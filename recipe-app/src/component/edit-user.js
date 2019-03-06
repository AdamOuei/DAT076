import React, { Component } from "react";
import axios from "axios";
import { AppContext } from "../AppProvider";

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
    //getUserInfo();
  }

  /*
  getUserInfo() {
    axios
      .post("/getUserInfo", {
        email: this.state.email
      })
      .then(res => {
        (this.state.name = res.data.name),
          (this.state.email = res.data.email),
          (this.state.password = res.data.password);
      });
  }*/

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
    axios.post("/update", {
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
                Email:
                <textarea
                  id="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder={this.state.email}
                />
              </label>
              <br />
              <label>
                Password:
                <textarea
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
