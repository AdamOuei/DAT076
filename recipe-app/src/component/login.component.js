import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from "./register-user.component";

export default class Login extends Component {
  render() {
    return (
      <Router>
        <div>
          <p>Login thingy here</p>
          <Link to="/register" className="nav-link">
            Register if not already
          </Link>

          <Route path="/register" component={Register} />
        </div>
      </Router>
    );
  }
}
