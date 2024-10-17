import React, { useEffect, useState } from "react";

import api from "../api";
import ImageModal from "./ImageModal";

import ComplaintUpdate from "./ComplaintUpdate";

import DisplayList from "./DisplayList";

export const ComplaintListContext = React.createContext();

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  // const [showModal, setShowModal] = useState(false);

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

  const updateComplaint = async (id, status, userType = "admin") => {
    const newStatusInfo = { date: new Date(), status };

    setSelectedComplaint((prevComplaint) => {
      const updatedComplaint = {
        ...prevComplaint,
        statusInfo: [newStatusInfo, ...(prevComplaint.statusInfo || [])],
      };

      // Perform the API call here, inside the state update function
      updateComplaintAPI(id, updatedComplaint);

      return updatedComplaint;
    });
  };

  // Separate function for the API call
  const updateComplaintAPI = async (id, updatedComplaint) => {
    try {
      const response = await api.put(`api/complaints/${id}`, updatedComplaint);

      if (response.status !== 200) {
        throw new Error("Failed to update complaint status");
      }

      // console.log(response);

      setComplaints((prevComplaints) => prevComplaints.map((c) => (c._id === id ? response.data : c)));
    } catch (err) {
      console.error("Error updating status:", err);
      // Optionally, you might want to revert the state change here
    }
  };

  const updateComplaintStatus = async (id, status, userType = "admin") => {
    try {
      let obj1 = { status };
      // if(userType === "AEK") {

      // }

      await api.put(`api/complaints/updateComplaintStatus/${id}`, { status });
      setComplaints(complaints.map((c) => (c._id === id ? { ...c, status } : c)));

      setSelectedComplaint(null);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const selectComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    // setShowModal(true);
  };

  return (
    <ComplaintListContext.Provider
      value={{
        complaints,
        selectedComplaint,
        setSelectedComplaint,
        // showModal,
        // setShowModal,
        selectComplaint,

        updateComplaint,
        updateComplaintAPI,
        updateComplaintStatus,
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

export default ComplaintList;
