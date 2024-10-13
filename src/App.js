import { useContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";

import ComplaintForm from "./components/ComplaintForm";
import ComplaintList from "./components/ComplaintList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import { toast } from "react-toastify";
import { Link, Outlet, Route,  Routes } from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  const [newComplaint, setNewComplaint] = useState(null);
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    toast("Welcome to Aadhar Complaint Management System");
  }, []);

  return (
  
   
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="complaints" element={<ComplaintForm />} />
          <Route path="complaintList" element={<ProtectedRoute> <ComplaintList /></ProtectedRoute>
           } />
        </Route>
      </Routes>
 

  );
}

function Layout() {

  return (
    <div className="App">
        <div className="App-header">

        <div>Aadhar Complaint Management System</div>
        </div>

        
        <NAV>
            <Link to="/complaints">Complaint Form</Link>
            <Link to="/complaintList">Complaint List</Link>
            <Link to="/login">Login</Link>
        </NAV>
       
      <main>
        <Outlet/>
      </main>
    </div>
  )
  
}

const NAV = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;

  a {
    color: #007bff;
    text-decoration: none;
    margin-right: 1rem;
  }
  `


export default App;
