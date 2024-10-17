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
      <h2> Complaint Update </h2>
      <COMPLAINT>
        <div>
          <SECTION>
            <span> Complaint ID :</span> <span>{complaint.complaintID || "NULL"} </span>
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
                <a
                  href="#!"
                  onClick={() => handleImageClick(complaint.image)}
                  style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                >
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

          <div>
            <button className="bg-green">Complaint Resolved</button>
            <button className="bg-red" onClick={() => setSelectedComplaint(null)}>
              Close
            </button>
          </div>
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

const SECTION = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  row-gap: 5px;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);

  border: 3px solid #ccc;
  padding: 10px;
  margin-right: 20px;

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
