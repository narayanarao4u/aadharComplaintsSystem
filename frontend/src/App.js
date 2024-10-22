import { useContext } from "react";
import bsnl from "./Assets/bsnl-logo.jpg";
import aadhar from "./Assets/Aadhaar_Logo.png";
import "./App.css";
import styled from "styled-components";

import ComplaintForm from "./components/ComplaintForm";
import ComplaintList from "./components/ComplaintList";

import Login from "./components/Login";
import Signup from "./components/Signup";
import AuthContext from "./context/AuthContext";
import { toast } from "react-toastify";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRoute";
import HomePage from "./components/HomePage";
import Feedback from "./components/Feedback";
import { GoHomeFill } from "react-icons/go";
import { NotFound } from "./components/NotFound";

function App() {
  const { state, dispatch } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Layout state={state} dispatch={dispatch} />}>
        <Route index element={<HomePage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      
          <Route path="complaints" element={ < ProtectedRoute> <ComplaintForm />  </ProtectedRoute>} />
       
        
        <Route path="feedback/:id" element={ < ProtectedRoute> <Feedback /> </ProtectedRoute>} />
        { ['admin', 'agm'].includes(state?.user?.role)   && (
        <Route
          path="complaintList"
          element={<ProtectedRoute> <ComplaintList role = {state?.user?.role} /> </ProtectedRoute>}
        />
      ) }

      <Route path="*" element={<NotFound />} />
      
      </Route>
    </Routes>
  );
}

function Layout({ state, dispatch } ) {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); // Dispatch the logout action
    localStorage.removeItem("token");
    toast("Logged out successfully");
    navigate("/");
  };
  return (
    <div className="App">
      <header>
        <div className="App-header" onClick={() => navigate("/")}>
          <img src={bsnl} className="bsnl-logo" alt="logo" />
          <div className="title">BSNL Visakhapatnam Complaint Management System</div>
          <img src={aadhar} className="aadhar-logo" alt="logo" />
        </div>
        <NAV>
          <Link to="/" className="flex items-center gap-1">
            {" "}
            <GoHomeFill /> <span>Home</span>{" "}
          </Link>
          <Link to="/complaints">New Complaint</Link>
          <Link to="/complaintList">Complaint List</Link>
          {state.isAuthenticated ? (
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </NAV>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>BSNL IT Team Visakhapatnam</footer>
    </div>
  );
}

const NAV = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem;
  background-color: #f8f9fa;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  margin-top: 5px;

  a {
    color: #007bff;
    text-decoration: none;
    margin-right: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
      color: #fe9900;
    }
  }
`;

export default App;
