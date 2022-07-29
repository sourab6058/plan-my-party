import React, { Component } from "react";

import { InputGroup, FormControl } from "react-bootstrap";
export default class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packageSearch: "",
    };
  }
  handleSearch = () => {
    if (this.state.packageSearch.trim() === "") return;
    window.location.href = `/packages?package=${this.state.packageSearch}`;
  };
  render() {
    return (
      <>
        <div>
          <div className="hero-main"></div>
          <div className="hero-text">
            <span>
              Find the perfect{" "}
              <span className="italic-text">
                party planner<br></br>
              </span>{" "}
              for your dream party.
            </span>
            <InputGroup className="mb-3 hero-search mt-3" size="lg">
              <FormControl
                placeholder='Try "birthday"'
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={this.state.packageSearch}
                onChange={(e) =>
                  this.setState({ packageSearch: e.target.value })
                }
              />
              <InputGroup.Text
                id="basic-addon2"
                style={{ backgroundColor: "var(--ltPurple)" }}
                onClick={this.handleSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="16"
                  fill="white"
                  style={{ backgroundColor: "var(--ltPurple)" }}
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </InputGroup.Text>
            </InputGroup>
          </div>
        </div>
      </>
    );
  }
}
