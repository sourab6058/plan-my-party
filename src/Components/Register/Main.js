import React, { useState } from "react";

import RegisterOptions from "./RegisterOptions";
import UserForm from "./UserForm";
import NavBar from "../NavBar";

export default function Main() {
  const [userType, setUserType] = useState(null);
  return (
    <div>
      <NavBar />
      {userType ? (
        <UserForm userType={userType} />
      ) : (
        <RegisterOptions setUserType={setUserType} />
      )}
    </div>
  );
}
