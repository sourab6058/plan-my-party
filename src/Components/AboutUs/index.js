import React from "react";
import { Button } from "react-bootstrap";
import "../../css/aboutUs.css";

export default function AboutUs() {
  return (
    <div className="main-div">
      <div className="top-content-outer-div">
        <div className="top-content-inner-div">
          <h1 className="main-heading">Revolutionizing Party Planning</h1>
          <h2 className="sub-heading">across India.</h2>
          <span className="paragraph">
            Click on the link below and choose the perfect party palnner for
            your next party.
          </span>
          <div className="buttons-div">
            <Button variant="primary" className=" mb-4 login1-button">
              Login
            </Button>
            <Button variant="primary" className=" mb-4 register-button">
              Register
            </Button>
          </div>
        </div>
        <div className="about-image"></div>
        <div className="about-img-back"></div>
      </div>
      <div className="value-div">
        <div className="value-box-div">
          <div className="value-purple-box"></div>
          <div className="value-ltpurple-box"></div>
        </div>
        <h1 className="value-heading">The Value We Live By </h1>
        <p className="value-text">
          We aim to empower our cutomers by providing them with myriad options
          to choose from and make their next occassion both special and
          feasible.{" "}
        </p>
      </div>
      <div className="team-div">
        <h1 className="team-heading">Our Team</h1>
        <div className="images-div data-container">
          <div className="image1 image">
            <p className="name">Sourab Kumar</p>
          </div>
          <div className="image2 image">
            <p className="name">Raghav Pareek</p>
          </div>
        </div>
      </div>
    </div>
  );
}
