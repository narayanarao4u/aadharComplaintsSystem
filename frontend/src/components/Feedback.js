import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import ComplaintInfo from "./ComplaintInfo";
import SatisfactionField from "../context/SatisfactionField";
import { toast } from "react-toastify";

function Feedback() {
  const { id } = useParams();

  const [complaint, setComplaint] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await api.get(`api/complaints/${id}`);
        setComplaint(response.data);
      } catch (err) {
        console.error("Error fetching complaint:", err);
      }
    };
    fetchComplaint();
  }, [id]);

  const handleSubmitFeedback = () => {
    if (complaint.satisfied === null) {
      toast.error("Please select satisfaction");
      return;
    }

    if (!complaint.feedback) {
      toast.error("Please enter feedback");
      return;
    }

    updateComplaintAPI(complaint._id, complaint);
    navigate("/");
  };

  const updateComplaintAPI = async (id, updatedComplaint) => {
    try {
      const response = await api.put(`api/complaints/${id}`, updatedComplaint);

      if (response.status !== 200) {
        throw new Error("Failed to update complaint status");
      }

      toast.success("Complaint status updated successfully");
      React.navigate("/");
    } catch (err) {
      console.error("Error updating status:", err);
      // Optionally, you might want to revert the state change here
    }
  };

  return (
    <div>
      <h2>Feedback</h2>
      <ComplaintInfo complaint={complaint} />
      <div className="text-center">
        <SatisfactionField
          onChange={(value) => {
            setComplaint({ ...complaint, satisfied: value });
          }}
          initialValue={complaint.satisfied}
        />
        <label className="text-bold">Feedback : </label>
        <input
          style={{ width: "400px" }}
          type="text"
          name="feedback"
          value={complaint?.feedback}
          onChange={(e) => setComplaint({ ...complaint, feedback: e.target.value })}
        />

        <button className="bg-gray" onClick={handleSubmitFeedback}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Feedback;
