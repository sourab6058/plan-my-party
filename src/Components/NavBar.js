import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "../css/NavBar.css";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: false,
      isLoginPage: false,
    };
  }
  componentDidMount() {
    if (window.location.href.includes("/login")) {
      if (localStorage.getItem("user-dets")) window.location.href = "/";

      this.setState({ isLoginPage: true });
    } else {
      this.setState({ isLoginPage: false });
    }
    if (localStorage.getItem("user-dets") && !this.state.userDetails) {
      this.setState({
        userDetails: JSON.parse(localStorage.getItem("user-dets")),
      });
    }
  }

  handleLogout = () => {
    this.setState({ userDetails: false });
    localStorage.removeItem("user-dets");
  };

  render() {
    return (
      <div>
        <Navbar expand="lg" className="nav-body">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/" style={{ textDecoration: "none" }}>
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                {this.state.userDetails ? (
                  <span onClick={this.handleLogout}>Logout</span>
                ) : (
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Login
                  </Link>
                )}
              </Nav.Link>
            </Nav>
            {this.state.userDetails && (
              <>
                {this.state.userDetails.type === "seller" &&
                this.state.userDetails.img_url ? (
                  <img
                    src={`http://localhost:8000/uploads/${this.state.userDetails.img_url}`}
                    width={40}
                    alt=""
                    height={40}
                    style={{
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      margin: "0 0.5rem",
                      border: "1px solid #ccc",
                      borderRadius: "50%",
                      padding: "2px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <h4>
                      {this.state.userDetails.username
                        .substr(0, 2)
                        .toUpperCase()}
                    </h4>
                  </div>
                )}
                {this.state.userDetails.type === "seller" && (
                  <Navbar.Text
                    style={{ marginLeft: "0.5rem", cursor: "pointer" }}
                  >
                    <Link to="add-package">+Add Package</Link>
                  </Navbar.Text>
                )}
              </>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
