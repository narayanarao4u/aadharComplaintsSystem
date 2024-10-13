import React, { useContext } from "react";
import AuthContext from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(AuthContext);

  return state.isAuthenticated ? children : <div>You need to login</div>;
};

export default ProtectedRoute;
