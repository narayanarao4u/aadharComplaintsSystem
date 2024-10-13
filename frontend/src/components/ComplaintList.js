import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../api";
import ImageModal from "./ImageModal";
import Moment from 'react-moment';


const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  

  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await api.get("api/complaints");
      setComplaints(response.data);
      

    };
    fetchComplaints();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`api/complaints/${id}`, { status });
      setComplaints(complaints.map((c) => (c._id === id ? { ...c, status } : c)));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <h2>Complaint List</h2>
      <ul>
        {complaints.map((complaint) => (
          <LI key={complaint._id}>
            <Moment format="DD-MM-YYYY HH:mm">{complaint.createdAt}</Moment>
            <strong>{complaint.stationId}</strong>
            <div>{complaint.name}</div>
            <div>{complaint.complaint}</div>
            {complaint.image && (
              <div>
                <a
                  href="#!"
                  onClick={() => handleImageClick(complaint.image)}
                  style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                >
                  View Image
                </a>
              </div>
            )}
            <div>Status: {complaint.status}</div>
            <button onClick={() => updateStatus(complaint._id, "Resolved")}>Resolve</button>
          </LI>
        ))}
      </ul>
      {/* Image Modal */}
      <ImageModal image={selectedImage} onClose={handleCloseModal} />
    </div>
  );
};

const LI = styled.li`
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(6, 1fr) 100px;

  padding: 2px 10px;
`;

export default ComplaintList;
