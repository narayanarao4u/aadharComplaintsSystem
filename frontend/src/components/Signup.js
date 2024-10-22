import React, { useState, useContext, useEffect, useCallback } from "react";
import AuthContext from "../context/AuthContext";
import api, { baseURL } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    stationName: "",
    role: "AEK",
  });
  const [stations, setStations] = useState([]);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchStations = useCallback(async () => {
    try {
      const response = await api.get("/api/complaints/stationData");
      setStations(response.data);
    } catch (err) {
      console.error("Error fetching stations:", err);
    }
  }, []);

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  useEffect(() => {
    const station = stations.find((s) => s.StationId === +formData.username);
    setFormData((prev) => ({ ...prev, stationName: station ? station.AEK_LOCATION : "" }));
  }, [formData.username, stations]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, confirmPassword, stationName } = formData;
    

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    console.log({ username, password, stationId: username, stationName });
    
    
   

    try {
      const res = await fetch(`${baseURL}auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, stationId: username, stationName }),
      });

      if (!res.ok) {
        toast.error('Bad Request or user already exists');
        throw new Error("Failed to sign up");
      }

      const data = await res.json();
      dispatch({ type: "LOGIN", payload: data });
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Create account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <label htmlFor="username">Username (AEK Station ID)</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="block w-full px-3 py-2 border rounded-t-md"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              id="stationName"
              name="stationName"
              type="text"
              className="block w-full px-3 py-2 border"
              placeholder="Station Name"
              value={formData.stationName}
              readOnly
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full px-3 py-2 border"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="block w-full px-3 py-2 border rounded-b-md"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Sign Up
          </button>

      
        </form>
      </div>
    </div>
  );
};

export default Signup;
