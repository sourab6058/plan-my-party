import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import PartyCard from "./PartyCard";

import "../../css/Carousel.css";
import axios from "axios";

const PACKAGES_API = process.env.REACT_APP_PACKAGES_API;

export default function PackageCarousel(props) {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios.get(PACKAGES_API).then((res) => setPackages(res.data));
  }, []);
  function showPackages(packages) {
    const cardsContainers = [];
    const cards = (i) => {
      let cardsArray = [];
      for (let j = i * 4; j < (i + 1) * 4; j++) {
        cardsArray.push(<PartyCard key={j} item={packages[j]} />);
      }
      return cardsArray;
    };
    for (let i = 0; i < Math.floor(packages.length / 4); i++) {
      cardsContainers.push(
        <div className="carousel-card-container">{cards(i)}</div>
      );
    }
    let cardsArrayDiv = [];
    for (let i = Math.floor(packages.length / 4); i < packages.length; i++) {
      cardsArrayDiv.push(<PartyCard key={i} item={packages[i]} />);
    }
    cardsContainers.push(
      <div className="carousel-card-container">{cardsArrayDiv}</div>
    );
    return cardsContainers;
  }
  var items = [
    {
      name: "Wedding",
      seller: "by sourab ",
    },
    {
      name: "Birthday",
      seller: "by Anku",
    },
    {
      name: "Baby Shower",
      seller: "by Sanyam ",
    },
    {
      name: "Office Party",
      seller: "by Sudhakar",
    },
  ];

  return (
    <div style={{ width: "95vw", margin: "0 auto" }}>
      <Carousel
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        navButtonsAlwaysVisible="true"
        animation="slide"
      >
        {showPackages(packages)}
      </Carousel>
    </div>
  );
}
