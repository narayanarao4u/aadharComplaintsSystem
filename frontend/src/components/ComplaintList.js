import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../api";
import ImageModal from "./ImageModal";
import Moment from "react-moment";
import ComplaintUpdate from "./ComplaintUpdate";
import { GrEdit } from "react-icons/gr";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await api.get("api/complaints");
      setComplaints(response.data);
    };
    fetchComplaints();
  }, []);

  const updateComplaint = async (id, status) => {


    setSelectedComplaint(null);
    /*
    try {
      await api.put(`api/complaints/${id}`, { status });
      setComplaints(complaints.map((c) => (c._id === id ? { ...c, status } : c)));
    } catch (err) {
      console.error("Error updating status:", err);
    }
      */
  };

  const selectComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);   
  }

 
  return (
    <div>
        {selectedComplaint 
         ? <ComplaintUpdate complaint={selectedComplaint}  updateComplaint={updateComplaint} /> 
         : <DisplayList complaints={complaints}  
           selectComplaint = {selectComplaint}  />
        }
        
        
      
     
    </div>
  );
};


//Display List Component
const DisplayList = ( {complaints, selectComplaint} ) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <h2>Complaint List</h2>
      <ol start={0}>
        <li>
          <DIV>
          
          <strong>Date/Time</strong>
          <strong>ComplaintID </strong>
          <strong>Station</strong>
          <strong>Complaint</strong>
          <strong>Images</strong>
          <strong>Status</strong>
          <strong>Status</strong>

          </DIV>
          
        </li>
        {complaints.map((complaint) => (
          
          <li key={complaint._id}>
            <DIV>
              {" "}
              <Moment format="DD-MM-YYYY HH:mm">{complaint.createdAt}</Moment>
              <strong>{complaint.complaintID}</strong>
              <div>{complaint.stationId}/{complaint.stationName}</div>
              <div>{complaint.complaint}</div>
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
              ) : <span>Image not Uploaded </span>}
              <div>Status: {complaint.status}</div>
              {complaint.status === "Pending" && (
             
                <button onClick={() => selectComplaint(complaint)}>
                  <GrEdit />
                </button>
              )}
            </DIV>
          </li>
        ))}
      </ol>
       {/* Image Modal */}
       <ImageModal image={selectedImage} onClose={handleCloseModal} />
    
    </>
  )

}

const DIV = styled.div`
text-align: left;
  /* list-style-type: none; */
  display: grid;
  grid-template-columns: repeat(6, 1fr) 100px;
  min-height: 40px;
  border-bottom: 1px solid #ccc;

  padding: 2px 10px;
`;

export default ComplaintList;
