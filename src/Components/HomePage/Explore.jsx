import React from "react";
import { Link } from "react-router-dom";
import "../../css/explore.css";

const icon1 = require("../../images/birthday-cake.png");
const icon2 = require("../../images/wedding-arch.png");
const icon3 = require("../../images/anniversary.png");
const icon4 = require("../../images/firework.png");
const icon5 = require("../../images/baby-shower.png");
const icon6 = require("../../images/champagne-glass.png");
const icon7 = require("../../images/romantic.png");
const icon8 = require("../../images/bachelor-party.png");
export default function Explore() {
  return (
    <div className="explore-div">
      <h1 className="explore-heading">Explore the marketplace</h1>
      <div className="explore-icons-div">
        <ul className="explore-icons-ul">
          <li className="explore-li">
            <Link to="/packages?package=birthday">
              <img className="explore-icons" src={icon1} />
              <div className="explore-icon-border"></div>
              <p className="explore-icons-text">Birthday</p>
            </Link>
          </li>
          <li className="explore-li">
            <Link to="/packages?package=wedding">
              <img className="explore-icons" src={icon2} />
              <div className="explore-icon-border"></div>
              <p className="explore-icons-text">Wedding</p>
            </Link>
          </li>

          <li className="explore-li">
            <Link to="/packages?package=festival">
              <img className="explore-icons" src={icon4} />
              <div className="explore-icon-border"></div>
              <p className="explore-icons-text">Festival</p>
            </Link>
          </li>
          <li className="explore-li">
            <Link to="/packages?package=baby shower">
              <img className="explore-icons" src={icon5} />
              <div className="explore-icon-border"></div>
              <p className="explore-icons-text">Baby Shower</p>
            </Link>
          </li>
        </ul>
        <ul className="explore-icons-ul">
          <li className="explore-li">
            <Link to="/packages?package=Anniversary">
              <img className="explore-icons" src={icon3} />
              <div className="explore-icon-border"></div>
              <p className="explore-icons-text">Anniversary</p>
            </Link>
          </li>
          <li className="explore-li">
            <Link to="/packages?package=date">
              <img className="explore-icons" src={icon7} />
              <div className="explore-icon-border"></div>
              <p className="explore-icons-text">Date</p>
            </Link>
          </li>

          <li className="explore-li">
            <Link to="/packages?package=office party">
              <img className="explore-icons" src={icon6} />
              <div className="explore-icon-border"></div>
              <p className="explore-icons-text">Office Party</p>
            </Link>
          </li>
          <li className="explore-li">
            <Link to="/packages?package=bachelor party">
              <img className="explore-icons" src={icon8} />
              <div className="explore-icon-border"></div>
              <p className="explore-icons-text">Bachelor Party</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
