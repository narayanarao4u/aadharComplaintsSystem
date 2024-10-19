import { useContext } from "react";
import AuthContext from "./AuthContext";
// import { useNavigate } from "react-router-dom";
import Login from "../components/Login";

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(AuthContext);

  return state.isAuthenticated ? children : <Login />;
};

export default ProtectedRoute;
