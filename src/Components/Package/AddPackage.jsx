import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";

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
      this.state.price === ""
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

  render() {
    return (
      <div>
        <Container style={{ maxWidth: "50vw" }}>
          <h1 style={{ color: "#aaa" }}>Add Package</h1>
          <br />
          <Form>
            <InputGroup size="sm">
              <InputGroup.Text
                id="inputGroup-sizing-sm1"
                style={{ minWidth: 100 }}
              >
                Title
              </InputGroup.Text>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                value={this.state.title}
                placeholder="Give a catchy title"
                onChange={(e) => this.setState({ title: e.target.value })}
                style={{ fontSize: "2rem" }}
              />
            </InputGroup>
            <br />
            <InputGroup style={{ minHeight: "20vh " }}>
              <InputGroup.Text>Desciption</InputGroup.Text>
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
            <InputGroup size="sm" className="mb-1">
              <InputGroup.Text
                id="inputGroup-sizing-sm2"
                style={{ minWidth: 100 }}
              >
                Price (₹)
              </InputGroup.Text>
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
            <h4>Add some pictures</h4>
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
                <p style={{ wordWrap: "break-word", lineBreak: "" }}>
                  An image of you or your team will make customers trust you
                  more.
                </p>
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
            <Button
              onClick={this.handleSubmit}
              style={{ width: "100%", margin: "1rem 0" }}
            >
              + Add Package
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
