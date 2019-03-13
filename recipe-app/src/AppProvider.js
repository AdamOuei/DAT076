import React, { Component } from "react";

export const AppContext = React.createContext();

export default class AppProvider extends Component {
  componentDidMount() {
    this.setState({
      isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
      user: {
        name: localStorage.getItem("userName"),
        email: localStorage.getItem("userEmail")
      }
    });
  }
  state = {
    user: {
      name: "",
      email: ""
    },
    isLoggedIn: false,
    setUser: loggedIn => {
      this.setState({
        isLoggedIn: loggedIn
      });
    },
    removeUser: () => {
      this.setState({
        isLoggedIn: false,
        name: "",
        email: ""
      });
      localStorage.setItem("isLoggedIn", false);
    }
  };
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
