import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { FormControl as FC, MenuItem, Box, Select } from "@mui/material";

import "../../css/addPackage.css";

const PACKAGES_API = process.env.REACT_APP_PACKAGES_API;
console.log(process.env.REACT_APP_PACKAGES_API);
export default class AddPackage extends Component {
  constructor(props) {
    super(props);
    this.uploadFileref = React.createRef();
    this.submitDpRef = React.createRef();
    this.state = {
      title: "",
      description: "",
      price: "",
      img: "",
      type: "",
      seller: {},
    };
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user-dets"));
    if (!user || user.type === "client") {
      window.location.href = "/login";
    }
    this.setState({ seller: user });
  }
  handleSubmit = () => {
    if (
      this.state.title === "" ||
      this.state.description === "" ||
      this.state.price === "" ||
      this.state.type === ""
    ) {
      alert("Something is missing!!");
      return;
    }

    axios
      .post(`${PACKAGES_API}/addPackage`, {
        title: this.state.title,
        description: this.state.description,
        price: this.state.price,
        img_url: this.state.img.name,
        seller_id: this.state.seller.id,
        type: this.state.type,
      })
      .then((res) => {
        console.log(res.data);
        alert("Successfully added the package");
        this.setState({
          title: "",
          description: "",
          price: "",
          img: "",
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Something is wrong");
      });
  };

  handleFileChange = (e) => {
    this.setState({ img: e.target.files[0] });
  };

  handleImageUpload = () => {
    if (
      this.state.title === "" ||
      this.state.description === "" ||
      this.state.price === ""
    ) {
      alert("First fill above required details");
      return;
    }
    this.uploadFileref.click();
  };

  types = [
    "",
    "Birthday",
    "Wedding",
    "Festival",
    "Baby Shower",
    "Anniversary",
    "Date",
    "Office Party",
    "Bachelor Party",
  ];

  render() {
    return (
      <div>
        <Container className="addpackage-container">
          <h1 className="heading">Add Package</h1>
          <p className="sub-text">
            Tell us a bit about the service you will offer. This information
            will help potential buyers to know better about your services.
          </p>
          <br />
          <br />
          <br />
          <Form>
            <InputGroup size="sm">
              <span className="form-desc-text">Title</span>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={this.state.title}
                placeholder="Give a catchy title"
                onChange={(e) => this.setState({ title: e.target.value })}
                style={{ fontSize: "1.5rem" }}
              />
            </InputGroup>
            <br />
            <br />

            <InputGroup style={{ minHeight: "20vh " }}>
              <span className="form-desc-text">Description</span>
              <FormControl
                style={{ minHeight: "20vh " }}
                as="textarea"
                aria-label="Description"
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
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
            <br />
            <InputGroup size="sm" className="mb-1">
              <span className="form-desc-text">Price (₹)</span>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                type="number"
                min="0"
                maximum
                value={this.state.price}
                onChange={(e) => this.setState({ price: e.target.value })}
              />
            </InputGroup>
            {this.state.price === "" && (
              <Form.Text muted className="mb-3">
                Price can not be empty.
              </Form.Text>
            )}
            <br />
            <br />
            <Box sx={{ minWidth: "" }}>
              <span className="form-desc-text">Type</span>
              <FC style={{ width: "50%", marginLeft: "160px", height: "50px" }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.type}
                  label="Type"
                  onChange={(e) => this.setState({ type: e.target.value })}
                >
                  {this.types.map((type) => (
                    <MenuItem value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FC>
            </Box>
            <br />
            <span className="form-desc-text">Add Some Photos</span>
            <p
              style={{
                wordWrap: "break-word",
                lineBreak: "",
                color: "#6c757d",
                fontSize: "0.875em",
              }}
            >
              An image of you or your team will make customers trust you more.
            </p>
            <div className="img-upload">
              {this.state.img !== "" && (
                <iframe
                  className="img-preview"
                  id="img-frame"
                  title="dp img"
                  name="img-frame"
                  scrolling="no"
                ></iframe>
              )}
              <div>
                <form
                  hidden
                  method="POST"
                  enctype="multipart/form-data"
                  action={`${PACKAGES_API}/packageImgUpload`}
                  target="img-frame"
                >
                  <input
                    type="file"
                    name="pkg-img"
                    id="pkg-img"
                    ref={(ref) => (this.uploadFileref = ref)}
                    onChange={this.handleFileChange}
                    accept="image/*"
                  />
                  <input
                    type="submit"
                    ref={(ref) => (this.submitDpRef = ref)}
                  />
                </form>
                {this.state.img === "" ? (
                  <Button
                    style={{ width: "fit-content" }}
                    onClick={() => this.handleImageUpload()}
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
            <div className="sbt-btn">
              <Button
                onClick={this.handleSubmit}
                style={{ width: "200px", margin: "3rem 0 0 0" }}
              >
                + Add Package
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    );
  }
}
