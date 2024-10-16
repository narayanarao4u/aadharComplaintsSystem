import React from "react";
import styled from "styled-components";
import { ComplaintListContext } from "./ComplaintList";
import Moment from "react-moment";
import VerticalTimeline from "./VerticalTimeline";

function ComplaintUpdate() {
  const {
    selectedComplaint: complaint,
    updateComplaint,
    handleImageClick,
  } = React.useContext(ComplaintListContext);

  const [status, setStatus] = React.useState(complaint.status);
  const handleUpdateClick = () => {
    if (!status) {
      alert("Please enter status");
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
              <a
                href="#!"
                onClick={() => handleImageClick(complaint.image)}
                style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
              >
                View Image
              </a>
            </span>
            <span>Complaint Date :</span>
            <span>
              <Moment format="DD-MM-YYYY HH:mm">{complaint.createdAt}</Moment>
            </span>
            <label>Update Status</label>
            <div>
              <input
                type="text"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
              <button onClick={handleUpdateClick}> Update</button>
            </div>
          </SECTION>
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
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);

  border: 3px solid #ccc;
  padding: 10px;
  margin-right: 20px;
`;

const COMPLAINT = styled.div`
  text-align: left;
  display: grid;
  grid-template-columns: 1fr 1fr;

  padding: 10px;
`;

export default ComplaintUpdate;
