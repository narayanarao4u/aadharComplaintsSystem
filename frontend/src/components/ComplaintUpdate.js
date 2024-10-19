import React, { useState } from "react";
import styled from "styled-components";
import VerticalTimeline from "./VerticalTimeline";
import { toast } from "react-toastify";
import { FaPlusCircle, FaThumbsDown, FaThumbsUp, FaCheckCircle } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";
import ComplaintInfo from "./ComplaintInfo";
import api from "../api";

const ComplaintUpdate = ({ complaint, onComplaintUpdate }) => {
  const [status, setStatus] = useState("");

  const [data, setData] = useState(complaint);

  const updateComplaint = async (id, newStatus) => {
    const newStatusInfo = { date: new Date(), status: newStatus };
    const updatedComplaint = {
      ...data,
      statusInfo: [newStatusInfo, ...(data.statusInfo || [])],
    };

    try {
      const response = await api.put(`api/complaints/${id}`, updatedComplaint);
      if (response.status !== 200) {
        throw new Error("Failed to update complaint status");
      }
      // onComplaintUpdate(response.data);
      setData(response.data);
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update complaint status");
    }
  };

  const updateComplaintStatus = async (id, newStatus) => {
    try {
      const response = await api.put(`api/complaints/updateComplaintStatus/${id}`, { status: newStatus });
      onComplaintUpdate(response.data);
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update complaint status");
    }
  };

  const handleUpdateClick = () => {
    if (!status.trim()) {
      toast.error("Please enter status");
      return;
    }
    updateComplaint(data._id, status);
    setStatus("");
  };

  return (
    <div>
      <h2 className="text-center">Complaint Update</h2>
      <ComplaintWrapper>
        <div>
          <ComplaintInfo complaint={data} />
          <Entry
            handleUpdateClick={handleUpdateClick}
            updateComplaintStatus={updateComplaintStatus}
            onClose={() => onComplaintUpdate(data)}
            status={status}
            setStatus={setStatus}
            complaint={data}
          />
        </div>
        {data.statusInfo && (
          <div>
            <h3>Status Info</h3>
            <VerticalTimeline statusInfo={data.statusInfo} />
            {data.satisfied !== null && (
              <>
                <h2 className="bg-yellow-500 py-2 my-2 flex items-center gap-2 justify-center">
                  <span>Feedback</span> <VscFeedback />
                </h2>
                <span className="flex space-x-4">
                  <span className="text-green-600 font-bold">{data.feedback}</span>
                  <span
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      data.satisfied === true ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                    aria-label="Yes, I'm satisfied"
                  >
                    {data.satisfied === true ? <FaThumbsUp className="w-4 h-4" /> : <FaThumbsDown className="w-4 h-4" />}
                  </span>
                </span>
              </>
            )}
          </div>
        )}
      </ComplaintWrapper>
    </div>
  );
};

const Entry = ({ handleUpdateClick, updateComplaintStatus, onClose, status, setStatus, complaint }) => (
  <div>
    <div>
      <label className="text-bold">Update Status : </label>
      <input style={{ width: "400px" }} type="text" name="status" value={status} onChange={(e) => setStatus(e.target.value)} />
      <button className="bg-gray" onClick={handleUpdateClick}>
        <FaPlusCircle />
      </button>
    </div>
    <div className="flex space-x-4 justify-center">
      <button
        className="bg-green-600 text-white flex items-center gap-2"
        onClick={() => updateComplaintStatus(complaint._id, "Resolved")}
      >
        Resolved <FaCheckCircle />
      </button>
      <button className="bg-red-500 text-white flex items-center gap-2" onClick={onClose}>
        Close <MdExitToApp />
      </button>
    </div>
  </div>
);

const ComplaintWrapper = styled.div`
  text-align: left;
  display: grid;
  grid-template-columns: minmax(600px, 1fr) 1fr;
  padding: 10px;
`;

export default ComplaintUpdate;
