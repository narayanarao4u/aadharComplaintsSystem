import  { useContext } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();

  return state.isAuthenticated ? children : navigate("/login");
};

export default ProtectedRoute;
