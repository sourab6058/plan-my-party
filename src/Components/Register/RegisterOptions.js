import { Button, Container } from "react-bootstrap";
import React from "react";
import Balloons from "../Balloons";

import "../../css/Register.css";

export default function RegisterOptions({ setUserType }) {
  return (
    <Balloons>
      <Container className="register-options">
        <div className="div" onClick={() => setUserType("customer")}>
          <div className="image-div-container">
            <div className="customer-image-div"></div>
          </div>

          <span className="div-text">Register as a customer.</span>
          {/* <Button className="btn" >
            Customer
          </Button> */}
        </div>
        <div className="div" onClick={() => setUserType("seller")}>
          <div className="image-div-container">
            <div className="seller-image-div"></div>
          </div>
          <span className="div-text">Register as a seller.</span>
          {/* <Button className="btn" >
            Seller
          </Button> */}
        </div>
      </Container>
    </Balloons>
  );
}
