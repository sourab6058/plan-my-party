import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import NavBar from "./NavBar";
import "../css/LoginForm.css";

export default class LoginForm extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container className="mt-5 login-container">
          <h1 classname="mb-5">Customer Login </h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address or Username</Form.Label>
              <Form.Control type="email" placeholder="Email or Username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <br />
            <span className="mb-5">
              Not registered? <Link to="/register">Register</Link>
            </span>
          </Form>
        </Container>
      </div>
    );
  }
}
