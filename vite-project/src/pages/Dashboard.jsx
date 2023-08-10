import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const DashBoard = () => {
  const {user} = useContext(UserContext);
  console.log(user)
  return (
    <div>
      DashBoard <div>{user && <h1>{user.name}</h1>}</div>
    </div>
  );
};
