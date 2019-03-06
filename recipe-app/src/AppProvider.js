import React, { Component } from "react";

export const AppContext = React.createContext();

export default class AppProvider extends Component {
  state = {
    number: 10,
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
        isLoggedIn: false
      });
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
