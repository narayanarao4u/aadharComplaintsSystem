import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ComplaintListContext } from "./ComplaintList";
import Moment from "react-moment";
import VerticalTimeline from "./VerticalTimeline";
import { toast } from "react-toastify";
import SatisfactionField from "../context/SatisfactionField";
import { FaPlusCircle } from "react-icons/fa";

const ComplaintUpdate = ({ type = "complaint" }) => {
  const {
    selectedComplaint: complaint,
    setSelectedComplaint,
    updateComplaint,
    updateComplaintStatus,
    handleImageClick,
    updateComplaintAPI,
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
    setSelectedComplaint(null);
  };

  if (!complaint) return null;

  return (
    <div>
      <h2 className="text-center">Complaint Update</h2>
      <ComplaintWrapper>
        <div>
          <ComplaintInfo complaint={complaint} handleImageClick={handleImageClick} />
          <Entry
            handleUpdateClick={handleUpdateClick}
            updateComplaintStatus={updateComplaintStatus}
            setSelectedComplaint={setSelectedComplaint}
            handleSubmitFeedback={handleSubmitFeedback}
            status={status}
            setStatus={setStatus}
            complaint={complaint}
            type={type}
          />
        </div>
        {complaint.statusInfo && (
          <div>
            <h3>Status Info</h3>
            <VerticalTimeline statusInfo={complaint.statusInfo} />
          </div>
        )}
      </ComplaintWrapper>

      <pre>{JSON.stringify(complaint, null, 2)}</pre>
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

  const AEKentry = (
    <div>
      <div>
        <label className="text-bold">Feedback : </label>
        <input
          style={{ width: "400px" }}
          type="text"
          name="feedback"
          value={complaint?.feedback}
          onChange={(e) => setSelectedComplaint({ ...complaint, feedback: e.target.value })}
        />

        <button className="bg-gray" onClick={handleSubmitFeedback}>
          Submit
        </button>
        <SatisfactionField
          onChange={(value) => {
            setSelectedComplaint({ ...complaint, satisfied: value });
          }}
          initialValue={complaint.satisfied}
        />
      </div>
    </div>
  );

  return type === "feedback" ? AEKentry : Adminentry;
};

const ComplaintInfo = ({ complaint, handleImageClick }) => (
  <InfoSection>
    <InfoItem label="Complaint ID" value={complaint.complaintID || "NULL"} />
    <InfoItem label="Station" value={`${complaint.stationId} - ${complaint.stationName}`} />
    <InfoItem label="Operator Details" value={`${complaint.Operatorname} - ${complaint.phone}`} />
    <InfoItem label="Complaint" value={complaint.complaint} />
    <InfoItem label="Status" value={complaint.status} />
    <InfoItem
      label="Images"
      value={
        complaint.image ? (
          <a className="text-blue-600 text-decoration-none font-bold" href="#!" onClick={() => handleImageClick(complaint.image)}>
            View Image
          </a>
        ) : (
          "No Image"
        )
      }
    />
    <InfoItem label="Complaint Date" value={<Moment format="DD-MM-YYYY HH:mm">{complaint.createdAt}</Moment>} />
  </InfoSection>
);

const InfoItem = ({ label, value }) => (
  <>
    <span>{label}:</span>
    <span>{value}</span>
  </>
);

const InfoSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  row-gap: 5px;
  border-radius: 10px;
  background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  border: 3px solid #ccc;
  padding: 10px;
  margin-right: 20px;
  margin-bottom: 20px;

  span:nth-child(odd) {
    font-weight: bold;
  }
`;

const ComplaintWrapper = styled.div`
  text-align: left;
  display: grid;
  grid-template-columns: minmax(600px, 1fr) 1fr;
  padding: 10px;
`;

export default ComplaintUpdate;
