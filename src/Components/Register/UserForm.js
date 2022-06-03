import React from "react";
import CustomerRegister from "./CustomerRegister";
import SellerRegister from "./SellerRegister";

export default function UserForm({ userType }) {
  return (
    <div>
      {userType === "customer" ? <CustomerRegister /> : <SellerRegister />}
    </div>
  );
}
