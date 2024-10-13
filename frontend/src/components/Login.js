import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { baseURL } from "../api";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseURL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      dispatch({ type: "LOGIN", payload: data });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>

      <div>{/* <Link to="/signup">Don't have an account? Sign up</Link> */}</div>
    </form>
  );
};

export default Login;
