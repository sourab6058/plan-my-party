import React, { Component } from "react";
import {
  Form,
  Button,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import axios from "axios";

import "../../css/Forms.css";

const CLIENTS_API = process.env.REACT_APP_CLIENTS_API;
const SELLERS_API = process.env.REACT_APP_SELLERS_API;

export default class CustomerRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordVisible: false,
      usernameAvailable: true,
      emailAvailable: true,
      username: "",
      email: "",
      password: "",
      rePassword: "",
      clients: [],
      sellers: [],
    };
  }
  componentDidMount = () => {
    axios
      .get(CLIENTS_API, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        this.setState({ clients: res.data });
      });
    axios
      .get(SELLERS_API, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        this.setState({ sellers: res.data });
      });
  };
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  handleUsernameChange = (e) => {
    let namesNotAvailable = [];

    this.setState({ username: e.target.value });

    const users = [...this.state.clients, ...this.state.sellers];

    namesNotAvailable = users.map((user) => user.username);

    if (namesNotAvailable.includes(e.target.value)) {
      this.setState({ usernameAvailable: false });
    } else {
      this.setState({ usernameAvailable: true });
    }
  };
  handleEmailChange = (e) => {
    let emailsNotAvailable = [];

    this.setState({ email: e.target.value });
    const users = [...this.state.clients, ...this.state.sellers];

    emailsNotAvailable = users.map((user) => user.email);
    console.log(emailsNotAvailable);

    if (emailsNotAvailable.includes(e.target.value)) {
      this.setState({ emailAvailable: false });
    } else {
      this.setState({ emailAvailable: true });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.email === "" ||
      !this.state.usernameAvailable ||
      this.state.username < 8 ||
      !this.state.emailAvailable ||
      this.state.email === "" ||
      this.state.password !== this.state.rePassword
    ) {
      alert("Something is wrong");
      return false;
    } else {
      axios
        .post(CLIENTS_API + "/add", {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        })
        .then((res) => {
          console.log(res.data);
          window.location.href = "http://localhost:3000/";
        });
    }
  };
  render() {
    return (
      <div>
        <Container fluid="sm form-container">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="test"
                placeholder="Enter username"
                value={this.state.username}
                onChange={this.handleUsernameChange}
              />
              {this.state.username && (
                <>
                  <Form.Text>
                    {this.state.usernameAvailable
                      ? "Username is available ✅"
                      : "Username is not available! ❌"}
                  </Form.Text>
                  {this.state.username.length < 8 && (
                    <>
                      <br />
                      <Form.Text>Username is too short❗</Form.Text>
                    </>
                  )}
                </>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
              {this.state.email && (
                <>
                  <Form.Text>
                    {this.state.emailAvailable
                      ? "Email is available ✅"
                      : "Email is already in use❌"}
                  </Form.Text>
                </>
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
                  onChange={this.handlePasswordChange}
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
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Re-Type Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-Type Password"
                value={this.state.rePassword}
                onChange={(e) => this.setState({ rePassword: e.target.value })}
              />
              {this.state.password !== "" && this.state.rePassword !== "" && (
                <Form.Text>
                  {this.state.password !== this.state.rePassword
                    ? "Passwords do not match!❌"
                    : "Passwords match ✅"}
                </Form.Text>
              )}
            </Form.Group>

            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
              Register As A Customer
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
