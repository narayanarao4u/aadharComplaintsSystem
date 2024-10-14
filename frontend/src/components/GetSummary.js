import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import "./GetSummary.css";

function GetSummary() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    toast("Welcome to Aadhar Complaint Management System");

    const fetchComplaints = async () => {
      const response = await api.get("api/complaints/getSummary");
      setComplaints(response.data);
    };
    fetchComplaints();
  }, []);

  return (
    <div className="GetSummary">
      {complaints.map((complaint) => (
        <div key={complaint._id} className={complaint._id}>
          <span>{complaint._id} : </span>
          <span>{complaint.count}</span>
        </div>
      ))}
    </div>
  );
}

export default GetSummary;
