import React, { useState } from "react";

import RegisterOptions from "./RegisterOptions";
import UserForm from "./UserForm";

export default function Main() {
  const [userType, setUserType] = useState(null);
  return (
    <div>
      {userType ? (
        <UserForm userType={userType} />
      ) : (
        <RegisterOptions setUserType={setUserType} />
      )}
    </div>
  );
}
