import React, { Component } from "react";
import PackageCarousel from "./PackageCarousel";
import PartyCard from "./PartyCard";
import "../../css/Carousel.css";
export default class Services extends Component {
  render() {
    return (
      <div className="homepage-services-div" style={{ height: "100vh" }}>
        <h1
          style={{
            margin: "2rem 70px 3rem 70px",
            padding: "0 0.75rem 0 0.75rem",
            display: "inline-block",
          }}
        >
          Popular Party Services
        </h1>
        <PackageCarousel></PackageCarousel>
      </div>
    );
  }
}
