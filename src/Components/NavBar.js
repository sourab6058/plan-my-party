import React, { Component } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../css/NavBar.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  componentDidMount() {
    let user = localStorage.getItem("user-dets");
    if (!user) return;
    user = JSON.parse(user);
    this.setState({ user });
    window.scrollTo(0, 0);
  }
  handleLogout = () => {
    localStorage.removeItem("user-dets");
    this.setState({ user: null });
    window.location.href = "/";
  };
  render() {
    return (
      <div>
        <Navbar
          variant="dark"
          className="navbar"
          // fixed="top"
          style={{
            backgroundColor: this.props.bgColor,
            position: "fixed",
            zIndex: 2,
            width: "100%",
            ...this.props.style,
          }}
        >
          <Container>
            <Navbar.Brand href="#home">
              <Link
                className="nav-links"
                style={{ color: this.props.fontColor }}
                to="/"
              >
                Plan My Party
              </Link>
            </Navbar.Brand>
            <Nav className="ml-auto lg">
              <Nav.Link>
                <Link
                  className="nav-links"
                  style={{ color: this.props.fontColor }}
                  to="/"
                >
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  className="nav-links"
                  style={{ color: this.props.fontColor }}
                  to="/#explore"
                >
                  Explore
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  className="nav-links"
                  style={{ color: this.props.fontColor }}
                  to="/aboutus"
                >
                  About Us
                </Link>
              </Nav.Link>
              {this.state.user ? (
                <>
                  {this.state.user.type === "seller" && (
                    <Nav.Link>
                      <Link
                        to="add-package"
                        className="nav-links"
                        style={{ color: this.props.fontColor }}
                      >
                        Add Package
                      </Link>
                    </Nav.Link>
                  )}
                  <Nav.Link>
                    <span
                      className="nav-links"
                      style={{ color: this.props.fontColor }}
                      onClick={this.handleLogout}
                    >
                      Log Out
                    </span>
                  </Nav.Link>
                  <span
                    className="user-avatar"
                    style={{
                      color: this.props.fontColor,
                      border: `1px solid ${this.props.fontColor}`,
                    }}
                  >
                    {this.state.user.img_url ? (
                      <img
                        src={`${BASE_URL}/uploads/${this.state.user.img_url}`}
                        width="40px"
                        height="40px"
                      />
                    ) : (
                      this.state.user.username.substr(0, 2).toUpperCase()
                    )}
                  </span>
                </>
              ) : (
                <>
                  <Nav.Link>
                    <Link
                      className="nav-links"
                      style={{ color: this.props.fontColor }}
                      to="/login"
                    >
                      Login
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link
                      className="nav-links"
                      style={{ color: this.props.fontColor }}
                      to="/register"
                    >
                      Join
                    </Link>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}
