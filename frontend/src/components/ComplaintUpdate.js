import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ComplaintListContext } from "./ComplaintList";
import VerticalTimeline from "./VerticalTimeline";
import { toast } from "react-toastify";
import { FaPlusCircle, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import ComplaintInfo from "./ComplaintInfo";

const ComplaintUpdate = () => {
  const {
    selectedComplaint: complaint,
    setSelectedComplaint,
    updateComplaint,
    updateComplaintStatus,
  } = useContext(ComplaintListContext);

  const [status, setStatus] = useState("");

  const handleUpdateClick = () => {
    if (!status.trim()) {
      toast.error("Please enter status");
      return;
    }

    updateComplaint(complaint._id, status);
    setStatus("");
  };

  if (!complaint) return null;

  return (
    <div>
      <h2 className="text-center">Complaint Update</h2>
      <ComplaintWrapper>
        <div>
          <ComplaintInfo complaint={complaint} />
          <Entry
            handleUpdateClick={handleUpdateClick}
            updateComplaintStatus={updateComplaintStatus}
            setSelectedComplaint={setSelectedComplaint}
            status={status}
            setStatus={setStatus}
            complaint={complaint}
          />
        </div>
        {complaint.statusInfo && (
          <div>
            <h3>Status Info</h3>
            <VerticalTimeline statusInfo={complaint.statusInfo} />
            {complaint.satisfied !== null && (
              <>
                <h2 className="text-center bg-yellow-500 py-2 my-2">Feedback</h2>
                <span className="flex space-x-4">
                  <span className="text-green-600 font-bold"> {complaint.feedback}</span>
                  <span
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      complaint.satisfied === true ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                    aria-label="Yes, I'm satisfied"
                  >
                    {complaint.satisfied === true ? <FaThumbsUp className="w-4 h-4" /> : <FaThumbsDown className="w-4 h-4" />}
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

const Entry = ({
  handleUpdateClick,
  updateComplaintStatus,
  handleSubmitFeedback,
  setSelectedComplaint,
  status,
  setStatus,
  complaint,
  type,
}) => {
  const Adminentry = (
    <div>
      <div>
        <label className="text-bold">Update Status : </label>
        <input style={{ width: "400px" }} type="text" name="status" value={status} onChange={(e) => setStatus(e.target.value)} />
        <button className="bg-gray" onClick={handleUpdateClick}>
          <FaPlusCircle />
        </button>
      </div>
      <div className="flex space-x-4 justify-center">
        <button className="bg-green-600 text-white" onClick={() => updateComplaintStatus(complaint._id, "Resolved")}>
          Resolved
        </button>
        <button className="bg-red-500 text-white" onClick={() => setSelectedComplaint(null)}>
          Close
        </button>
      </div>
    </div>
  );

  return Adminentry;
};

const ComplaintWrapper = styled.div`
  text-align: left;
  display: grid;
  grid-template-columns: minmax(600px, 1fr) 1fr;
  padding: 10px;
`;

export default ComplaintUpdate;
