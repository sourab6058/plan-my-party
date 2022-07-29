import React from "react";
import "../css/balloons.css";

export default function Balloons({ children }) {
  return (
    <div className="outer-balloons">
      <div class="holder back">
        <div class="balloon"></div>
        <div class="balloon"></div>
        <div class="balloon"></div>
        <div class="balloon"></div>
        <div class="balloon"></div>
      </div>
      <div class="holder front">
        <div class="balloon"></div>
        <div class="balloon"></div>
        <div class="balloon"></div>
        <div class="balloon"></div>
        <div class="balloon"></div>
      </div>
      {children}
    </div>
  );
}
