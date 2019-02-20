import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

export default class Login extends Component {
  state = {};
  render() {
    return (
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Login Page</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>This is where the Login page is</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save user</Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}
