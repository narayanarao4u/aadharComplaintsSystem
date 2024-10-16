import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../api";
import ImageModal from "./ImageModal";
import Moment from "react-moment";
import ComplaintUpdate from "./ComplaintUpdate";
import { GrEdit } from "react-icons/gr";
import { now } from "moment";

export const ComplaintListContext = React.createContext();

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const fetchComplaints = async () => {
    const response = await api.get("api/complaints");
    setComplaints(response.data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateComplaint = async (id, status) => {
    setSelectedComplaint((prevComplaint) => ({
      ...prevComplaint,
      statusInfo: [{ date: new Date(), status }, ...(prevComplaint.statusInfo || [])],
    }));
  };

  // setSelectedComplaint(null);
  /*
    try {
      await api.put(`api/complaints/${id}`, { status });
      setComplaints(complaints.map((c) => (c._id === id ? { ...c, status } : c)));
    } catch (err) {
      console.error("Error updating status:", err);
    }
      */

  const selectComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  return (
    <ComplaintListContext.Provider
      value={{
        complaints,
        selectedComplaint,
        showModal,
        setShowModal,
        selectComplaint,
        updateComplaint,
        selectedImage,
        setSelectedImage,
        handleImageClick,
        handleCloseModal,
      }}
    >
      <div>{selectedComplaint ? <ComplaintUpdate /> : <DisplayList />}</div>

      {/* Image Modal */}
      <ImageModal image={selectedImage} onClose={handleCloseModal} />
    </ComplaintListContext.Provider>
  );
};

//Display List Component
const DisplayList = () => {
  const { complaints, selectComplaint, handleImageClick } = React.useContext(ComplaintListContext);

  return (
    <DIV>
      <h2>Complaint List</h2>
      <table start={0}>
        <tr>
          <th>
            <abbr title="Complaint"> ID </abbr>
          </th>
          <th>Date/Time</th>
          <th>Station</th>
          <th>Station ID</th>
          <th>Complaint</th>
          <th>Images</th>
          <th>Status</th>
          <th>Status</th>
        </tr>
        {complaints.map((complaint) => (
          <tr key={complaint._id}>
            <td className="text-bold">{complaint.complaintID}</td>
            <td>
              <Moment format="DD-MM-YYYY HH:mm">{complaint.createdAt}</Moment>
            </td>

            <td> {complaint.stationName}</td>
            <td>{complaint.stationId}</td>
            <td>{complaint.complaint}</td>
            <td>
              {complaint.image ? (
                <div>
                  <a
                    href="#!"
                    onClick={() => handleImageClick(complaint.image)}
                    style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                  >
                    View Image
                  </a>
                </div>
              ) : (
                <span>Image not Uploaded </span>
              )}
            </td>
            <td>Status: {complaint.status}</td>

            <td>
              {complaint.status === "Pending" && (
                <button onClick={() => selectComplaint(complaint)}>
                  <GrEdit />
                </button>
              )}
            </td>
          </tr>
        ))}
      </table>
    </DIV>
  );
};

const DIV = styled.div`
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th {
    text-align: left;
    padding: 8px;
  }

  td {
    /* text-align: left; */
    padding: 4px;
    border-left: 1px solid lightgrey;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2; /* Light grey */
  }
`;

export default ComplaintList;
