import { Navigate } from "react-router-dom";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function RouteWrapper({
  loggedComponent, defaultComponent, isPrivate
}) {

  const {signed, loading} = useContext(AuthContext);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!signed && isPrivate) {
    return <Navigate to="/" />;
  }

  if (signed && !isPrivate) {
    return <Navigate to="/dashboard" />;
  }

  return (
    signed ? loggedComponent : defaultComponent
  );
}
