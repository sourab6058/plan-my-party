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

import Cake from "./Cake";

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
        <Container className=" login-container" style={{ paddingRight: 0 }}>
          <div className="form-div">
            <span className="mb-5 login-heading">Welcome Back </span>
            <Form>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <>
                  <Form.Text>
                    {this.state.showNoUserError
                      ? "Email or username or password is wrong❌."
                      : ""}
                  </Form.Text>
                </>

                <Form.Control
                  type="text"
                  placeholder="Email / Username"
                  value={this.state.emailOrUsername}
                  onChange={(e) =>
                    this.setState({ emailOrUsername: e.target.value })
                  }
                />
                {this.state.showErrors && this.state.emailOrUsername === "" && (
                  <Form.Text>Email or username can not be empty❌.</Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <InputGroup className="mb-4">
                  <FormControl
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon2"
                    type={this.state.passwordVisible ? "text" : "password"}
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
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
              <Button
                variant="primary"
                className=" mb-4 login-button"
                onClick={this.handleLogin}
              >
                Login
              </Button>
              <br />
              <span className="mb-2 not-a-member">
                Not a member yet? <Link to="/register">Join Now</Link>
              </span>
            </Form>
          </div>
          <div className="login-div">
            <h1 className="login-div-heading">
              Make it <br /> Happen.
            </h1>
            <p className="login-div-text">
              Don't just sit back and wait. Go ahead and choose the perfect
              party planner for your dream party. <br />
            </p>
            <Cake />
          </div>
        </Container>
      </div>
    );
  }
}
