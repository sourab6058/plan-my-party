import React, { useState } from "react";
import "../../css/footer.css";
import {
  Facebook,
  Instagram,
  YouTube,
  Twitter,
  Copyright,
} from "@mui/icons-material";
import { InputGroup, FormControl } from "react-bootstrap";

export default function Footer() {
  const [searchPackage, setSearchPackage] = useState("");

  const handleSearch = () => {
    if (searchPackage.trim() === "") return;
    window.location.href = `/packages?package=${searchPackage}`;
  };
  return (
    <div className="footer-outer-div">
      <div className="footer-inner-div1">
        <div className="logo-div">
          <h1 className="logo">Plan My Party</h1>
          <p className="logo-sub-text">Revolutionizing party planning</p>
        </div>
        <div className="footer-links-outer-div">
          <div className="footer-links-div">
            <a href="#">
              <h2 className="footer-link">Home</h2>
            </a>
            <a href="#">
              <h2 className="footer-link">About Us</h2>
            </a>
            <a href="#">
              <h2 className="footer-link">Explore</h2>
            </a>
            <a href="#">
              <h2 className="footer-link">SignIn / SignUp</h2>
            </a>
          </div>
          <InputGroup className=" footer-search mt-3" size="sm">
            <FormControl
              placeholder='Try "wedding"'
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={searchPackage}
              onChange={(e) => setSearchPackage(e.target.value)}
            />
            <InputGroup.Text
              id="basic-addon2"
              style={{ backgroundColor: "var(--ltrPurple)" }}
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="16"
                fill="White"
                style={{ backgroundColor: "var(--ltrPurple)" }}
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </InputGroup.Text>
          </InputGroup>
        </div>
      </div>
      <br />
      <br />
      <hr className="footer-line" />
      <div className="footer-social-links-div">
        <a href="#">
          <Facebook
            className="social-link"
            style={{ fontSize: "2rem", color: "#fff" }}
          />
        </a>
        <a href="#">
          <Instagram
            className="social-link"
            style={{ fontSize: "2rem", color: "#fff" }}
          />
        </a>
        <a href="#">
          <YouTube
            className="social-link"
            style={{ fontSize: "2rem", color: "#fff" }}
          />
        </a>
        <a href="#">
          <Twitter
            className="social-link"
            style={{ fontSize: "2rem", color: "#fff" }}
          />
        </a>
      </div>
      <p className="copyright">
        {" "}
        <Copyright style={{ fontSize: "1rem", marginTop: "0.25rem" }} />
        2022 Plan My party. All rights reserved.{" "}
      </p>
    </div>
  );
}
