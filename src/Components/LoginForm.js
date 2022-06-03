import axios from "axios";
import React, { Component } from "react";
import {
  Form,
  Button,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

import "../css/LoginForm.css";

const CLIENTS_API = process.env.REACT_APP_CLIENTS_API;
const SELLERS_API = process.env.REACT_APP_SELLERS_API;

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailOrUsername: "",
      password: "",
      passwordVisible: false,
      showErrors: false,
      userDetails: {},
      showNoUserError: false,
    };
  }
  componentDidMount() {
    if (localStorage.getItem("user-dets")) window.location.href = "/";
  }
  handleLogin = () => {
    if (this.state.emailOrUsername === "" || this.state.password === "")
      this.setState({ showErrors: true });

    axios
      .post(CLIENTS_API, {
        emailOrUsername: this.state.emailOrUsername,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res.data);
        if (Object.keys(res.data).length > 1) {
          this.setState({ userDetails: res.data });
          this.setState({ showNoUserError: false });
          localStorage.setItem("user-dets", JSON.stringify(res.data));
          window.location.href = "/";
        } else {
          axios
            .post(SELLERS_API, {
              emailOrUsername: this.state.emailOrUsername,
              password: this.state.password,
            })
            .then((res) => {
              if (Object.keys(res.data).length > 1) {
                this.setState({ userDetails: res.data });
                this.setState({ showNoUserError: false });
                localStorage.setItem("user-dets", JSON.stringify(res.data));
                window.location.href = "/";
              } else {
                this.setState({ showNoUserError: true });
              }
            });
        }
      });
  };
  render() {
    return (
      <div>
        <Container className="mt-5 login-container">
          <h1 classname="mb-5">Login </h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <>
                <Form.Text>
                  {this.state.showNoUserError
                    ? "Email or username or password is wrong❌."
                    : ""}
                </Form.Text>
                <br />
              </>

              <Form.Label>Email address or Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email or Username"
                value={this.state.emailOrUsername}
                onChange={(e) =>
                  this.setState({ emailOrUsername: e.target.value })
                }
              />
              {this.state.showErrors && this.state.emailOrUsername === "" && (
                <Form.Text>Email or username can not be empty❌.</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Enter Password"
                  aria-label="Enter Password"
                  aria-describedby="basic-addon2"
                  type={this.state.passwordVisible ? "text" : "password"}
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <InputGroup.Text
                  id="basic-addon2"
                  onClick={() =>
                    this.setState({
                      passwordVisible: !this.state.passwordVisible,
                    })
                  }
                >
                  {this.state.passwordVisible ? (
                    <AiFillEye />
                  ) : (
                    <AiFillEyeInvisible />
                  )}
                </InputGroup.Text>
              </InputGroup>
              {this.state.showErrors && this.state.password === "" && (
                <Form.Text>Password can not empty❌.</Form.Text>
              )}
            </Form.Group>
            <Button variant="primary" onClick={this.handleLogin}>
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
