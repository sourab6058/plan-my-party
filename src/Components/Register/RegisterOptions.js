import { Button, Container } from "react-bootstrap";
import React from "react";

import "../../css/Register.css";

export default function RegisterOptions({ setUserType }) {
  return (
    <div>
      <Container className="register-options">
        <Button className="btn" onClick={() => setUserType("customer")}>
          Register As A Customer
        </Button>
        <br />
        <Button className="btn" onClick={() => setUserType("seller")}>
          Register As A Seller
        </Button>
      </Container>
    </div>
  );
}
