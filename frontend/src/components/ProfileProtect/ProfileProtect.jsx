import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProfileProtect({ children }) {
  const { user } = useSelector((state) => state.userStore);
  return user.hasOwnProperty("email") ? children : <Navigate to={"/"} />;
}

export default ProfileProtect;
