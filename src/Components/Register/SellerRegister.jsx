import React, { Component, createRef } from "react";
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

const SELLERS_API = process.env.REACT_APP_SELLERS_API;
const CLIENTS_API = process.env.REACT_APP_CLIENTS_API;

export default class CustomerRegister extends Component {
  constructor(props) {
    super(props);
    this.uploadFileref = createRef();
    this.submitDpRef = createRef();
    this.state = {
      passwordVisible: false,
      usernameAvailable: true,
      emailAvailable: true,
      username: "",
      email: "",
      password: "",
      rePassword: "",
      description: "",
      building: "",
      city: "",
      stateName: "",
      country: "",
      sellers: [],
      clients: [],
      getMoreInfo: false,
      selectedDp: "",
      imgSource: "",
    };
  }
  componentDidMount = () => {
    axios
      .get(SELLERS_API, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        this.setState({ sellers: res.data });
      });
    axios.get(CLIENTS_API).then((res) => this.setState({ clients: res.data }));
  };
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  handleUsernameChange = (e) => {
    let namesNotAvailable = [];

    this.setState({ username: e.target.value });

    const names = [...this.state.sellers, ...this.state.clients];

    namesNotAvailable = names.map((user) => user.username);
    console.log(namesNotAvailable);

    if (namesNotAvailable.includes(e.target.value)) {
      this.setState({ usernameAvailable: false });
    } else {
      this.setState({ usernameAvailable: true });
    }
  };
  handleEmailChange = (e) => {
    let emailsNotAvailable = [];

    this.setState({ email: e.target.value });

    const names = [...this.state.sellers, ...this.state.clients];

    emailsNotAvailable = names.map((user) => user.email);
    console.log(emailsNotAvailable);

    if (emailsNotAvailable.includes(e.target.value)) {
      this.setState({ emailAvailable: false });
    } else {
      this.setState({ emailAvailable: true });
    }
  };
  handleNext = () => {
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
      this.setState({ getMoreInfo: true });
    }
  };
  handleFileChange = (e) => {
    this.setState({ selectedDp: e.target.files[0] });
    console.log(e.target.files[0]);
  };
  handleSellerSave = () => {
    if (
      this.state.description.length < 80 ||
      this.state.stateName === "" ||
      this.state.city === "" ||
      this.state.country === ""
    )
      alert("Something is wrong");
    else {
      const postData = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        description: this.state.description,
        address: `${this.state.building}, ${this.state.city}, ${this.state.stateName}, ${this.state.country}`,
        img_url: this.state.selectedDp.name,
      };
      axios
        .post(`${SELLERS_API}/add`, postData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.error(err));
    }
  };
  render() {
    return (
      <div>
        <Container fluid="sm form-container">
          {!this.state.getMoreInfo ? (
            <>
              <h1 className="mb-5">Register as a Seller</h1>
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
                    onChange={(e) =>
                      this.setState({ rePassword: e.target.value })
                    }
                  />
                  {this.state.password !== "" &&
                    this.state.rePassword !== "" && (
                      <Form.Text>
                        {this.state.password !== this.state.rePassword
                          ? "Passwords do not match!❌"
                          : "Passwords match ✅"}
                      </Form.Text>
                    )}
                </Form.Group>

                <Button
                  variant="primary"
                  onClick={this.handleNext}
                  style={{ width: "100%" }}
                >
                  Next
                </Button>
              </Form>
            </>
          ) : (
            <Form>
              <h1>Kindly tell us more</h1>
              <InputGroup style={{ minHeight: "20vh " }} className="mt-5">
                <InputGroup.Text>Desciption</InputGroup.Text>
                <FormControl
                  style={{ minHeight: "20vh " }}
                  as="textarea"
                  aria-label="Description"
                  value={this.state.description}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </InputGroup>
              {this.state.description !== "" &&
                this.state.description.length < 80 && (
                  <>
                    <Form.Text>
                      Description must be more than 80 characters long.
                    </Form.Text>
                  </>
                )}
              <br />
              <h3>Address: </h3>
              <InputGroup size="sm" className="mb-1">
                <InputGroup.Text
                  id="inputGroup-sizing-sm1"
                  style={{ minWidth: 100 }}
                >
                  Building
                </InputGroup.Text>
                <FormControl
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  value={this.state.building}
                  onChange={(e) => this.setState({ building: e.target.value })}
                />
              </InputGroup>
              <br />
              <InputGroup size="sm" className="mb-1">
                <InputGroup.Text
                  id="inputGroup-sizing-sm2"
                  style={{ minWidth: 100 }}
                >
                  City/Area
                </InputGroup.Text>
                <FormControl
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  value={this.state.city}
                  onChange={(e) => this.setState({ city: e.target.value })}
                />
              </InputGroup>
              {this.state.city === "" && (
                <Form.Text muted className="mb-3">
                  City can not be empty.
                </Form.Text>
              )}
              <br />
              <InputGroup size="sm" className="mb-1">
                <InputGroup.Text
                  id="inputGroup-sizing-sm3"
                  style={{ minWidth: 100 }}
                >
                  State
                </InputGroup.Text>
                <FormControl
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  value={this.state.stateName}
                  onChange={(e) => this.setState({ stateName: e.target.value })}
                />
              </InputGroup>
              {this.state.stateName === "" && (
                <Form.Text>State can not be empty.</Form.Text>
              )}
              <br />
              <InputGroup size="sm" className="mb-1">
                <InputGroup.Text
                  id="inputGroup-sizing-sm4"
                  style={{ minWidth: 100 }}
                >
                  Country
                </InputGroup.Text>
                <FormControl
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  value={this.state.country}
                  onChange={(e) => this.setState({ country: e.target.value })}
                />
              </InputGroup>
              {this.state.country === "" && (
                <Form.Text>Country can not be empty.</Form.Text>
              )}
              <br />
              <h4>Profile Pic</h4>
              <div className="img-upload">
                <iframe
                  className="img-preview"
                  id="img-frame"
                  title="dp img"
                  name="img-frame"
                  scrolling="no"
                ></iframe>
                <div>
                  <p style={{ wordWrap: "break-word", lineBreak: "" }}>
                    An image of you or your team will make customers trust you
                    more.
                  </p>
                  <form
                    hidden
                    method="POST"
                    action={`${SELLERS_API}/dpUpload`}
                    enctype="multipart/form-data"
                    target="img-frame"
                  >
                    <input
                      type="file"
                      name="dp"
                      id="dp"
                      ref={(ref) => (this.uploadFileref = ref)}
                      onChange={this.handleFileChange}
                      accept="image/*"
                    />
                    <input
                      type="submit"
                      ref={(ref) => (this.submitDpRef = ref)}
                    />
                  </form>
                  {this.state.selectedDp === "" ? (
                    <Button
                      style={{ width: "fit-content" }}
                      onClick={() => this.uploadFileref.click()}
                    >
                      Select Image
                    </Button>
                  ) : (
                    <Button
                      style={{ width: "fit-content" }}
                      onClick={() => this.submitDpRef.click()}
                    >
                      Upload Image
                    </Button>
                  )}
                </div>
              </div>
              <Button
                onClick={this.handleSellerSave}
                style={{ width: "100%", margin: "1rem 0" }}
              >
                Let's Go
              </Button>
            </Form>
          )}
        </Container>
      </div>
    );
  }
}
