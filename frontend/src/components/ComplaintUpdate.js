import React from "react";
import styled from "styled-components";
import { ComplaintListContext } from "./ComplaintList";
import Moment from "react-moment";
import VerticalTimeline from "./VerticalTimeline";
import { toast } from "react-toastify";

function ComplaintUpdate() {
  const {
    selectedComplaint: complaint,
    setSelectedComplaint,
    updateComplaint,
    updateComplaintStatus,
    handleImageClick,
  } = React.useContext(ComplaintListContext);

  const [status, setStatus] = React.useState("");
  const handleUpdateClick = () => {
    if (!status.trim()) {
      toast.error("Please enter status");
      // alert("Please enter status");
      return;
    }
    updateComplaint(complaint._id, status);
    setStatus("");
  };

  return (
    <div>
      <h2 className="text-center"> Complaint Update </h2>
      <COMPLAINT>
        <div>
          <ComplaintInfo complaint={complaint} handleImageClick={handleImageClick} />
          <AdminEntry
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
          </div>
        )}
      </COMPLAINT>
    </div>
  );
}

const AdminEntry = ({ handleUpdateClick, updateComplaintStatus, setSelectedComplaint, status, setStatus, complaint }) => {
  return (
    <div>
      <div>
        <span>
          <label className="text-bold">Update Status : </label>
        </span>
        <span>
          <input
            style={{ width: "400px" }}
            type="text"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <button className="bg-gray" onClick={handleUpdateClick}>
            Add
          </button>
        </span>
      </div>

      <div className="flex space-x-4 justify-center">
        <button
          className="bg-green-600 text-white"
          onClick={() => {
            console.log("clicked");

            updateComplaintStatus(complaint._id, "Resolved");
          }}
        >
          Resolved
        </button>
        <button className="bg-red-500 text-white" onClick={() => setSelectedComplaint(null)}>
          Close
        </button>
      </div>
    </div>
  );
};
const ComplaintInfo = ({ complaint, handleImageClick }) => {
  return (
    <SECTION>
      <span> Complaint ID :</span>
      <span className="text-bold text-lg text-green-600">{complaint.complaintID || "NULL"} </span>
      <span> Station :</span>
      <span>
        {complaint.stationId} - {complaint.stationName}
      </span>
      <span>Operator Detials :</span>
      <span>
        {complaint.Operatorname} - {complaint.phone}
      </span>
      <span>Complaint :</span>
      <span>{complaint.complaint}</span>
      <span>Status :</span>
      <span>{complaint.status}</span>
      <span>Images :</span>
      <span>
        {complaint.image ? (
          <a className="text-blue-600 text-decoration-none font-bold" href="#!" onClick={() => handleImageClick(complaint.image)}>
            View Image
          </a>
        ) : (
          <span>No Image</span>
        )}
      </span>
      <span>Complaint Date :</span>
      <span>
        <Moment format="DD-MM-YYYY HH:mm">{complaint.createdAt}</Moment>
      </span>
    </SECTION>
  );
};

const SECTION = styled.section`
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

const COMPLAINT = styled.div`
  text-align: left;
  display: grid;
  grid-template-columns: minmax(600px, 1fr) 1fr;

  padding: 10px;
`;

export default ComplaintUpdate;
