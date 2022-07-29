import React, { Component } from "react";
import Hero from "./HomePage/Hero";

import NavBar from "./NavBar";
import "../css/HomePage.css";
import Services from "./HomePage/Services";
import Explore from "./HomePage/Explore";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: null,
      fontColor: "white",
    };
  }

  render() {
    return (
      <div>
        <Hero />
        <Explore />
        <Services />
      </div>
    );
  }
}
