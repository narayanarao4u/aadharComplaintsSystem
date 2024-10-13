import React from "react";
import "./ImageModal.css"; // Add some basic styling for the modal

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>
        <br />
        <img src={image} alt="Complaint" style={{ maxWidth: "100%", maxHeight: "100%" }} />
      </div>
    </div>
  );
};

export default ImageModal;
