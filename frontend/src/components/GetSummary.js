import React, { useEffect, useState } from "react";
import api from "../api";
import { CheckCircle, Clock } from "lucide-react";

const GetSummary = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchComplaints = async () => {
      try {
        const response = await api.get("api/complaints/getSummary");
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <h1 className="text-3xl font-bold mb-6">Complaints Summary</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {complaints.map((complaint) => (
          <div
            key={complaint._id}
            className={`flex items-center justify-between p-4 rounded-lg shadow-md ${
              complaint._id === "Resolved" ? "bg-green-300" : complaint._id === "Pending" ? "bg-red-300" : "bg-white"
            }`}
          >
            <div className="flex items-center">
              {complaint._id === "Resolved" ? (
                <CheckCircle className="w-6 h-6 text-green-800 mr-2" />
              ) : complaint._id === "Pending" ? (
                <Clock className="w-6 h-6 text-red-800 mr-2" />
              ) : null}
              <span className="font-semibold">{complaint._id}</span>
            </div>
            <span className="text-xl font-bold">{complaint.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetSummary;
