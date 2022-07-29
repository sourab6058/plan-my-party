import { Paper, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import "../../css/Carousel.css";
const cardImg = require("../../images/about-image.jpg");
const sellerImg = require("../../images/sourab-img.jpg");

const SELLERS_API = process.env.REACT_APP_SELLERS_API;
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function Item({ item }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const seller_id = item.seller_id;
    console.log(seller_id);
    axios.get(`${SELLERS_API}/${seller_id}`).then((res) => {
      // setUser(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <div>
      <Paper className="carousel-card">
        <img
          src={item.imgs_url && `${BASE_URL}/uploads/${item.imgs_url}`}
          width="100%"
          height="280px"
          style={{ border: "4px 4px 0 0 " }}
        />
        <div className="card-description">
          <img
            className="seller-img"
            src={user && `${BASE_URL}/uploads/${user.img_url}`}
            width="40px"
            height="40px"
          />
          <div className="card-description-text">
            <h4 className="description-heading">{user.username}</h4>
            <p className="description-text">{item.type}</p>
          </div>
        </div>
      </Paper>
    </div>
  );
}
