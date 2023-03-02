import React from "react";
import { getToken } from "../store/localStorage";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const LoggedInProtection = ({ children, redirectTo }) => {
  let isAuthenticated = getToken();

  // const { role, isArtistOnboarded } = useSelector((state) => state.auth);

  // if (role === "Artist" && isArtistOnboarded) {
  //   redirectTo = "/artist";
  // } else if (role === "Artist" && !isArtistOnboarded) {
  //   redirectTo = "/artist-onboarding";
  // } else if (role === "Customer") {
  //   redirectTo = "/dashboard";
  // }

  // return isAuthenticated ? (
  //   <>{children}</>
  // ) : (
  //   <Navigate to={redirectTo} replace={true} />
  // );

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default LoggedInProtection;
