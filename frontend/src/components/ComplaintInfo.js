import React, { useState } from "react";
import ImageModal from "./ImageModal";
import styled from "styled-components";
import Moment from "react-moment";
import { StatusElement } from "./StatusElement";

const ComplaintInfo = ({ complaint }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <InfoSection>
        <InfoItem label="Complaint ID" value={complaint.complaintID || "NULL"} />
        <InfoItem label="Station" value={`${complaint.stationId} - ${complaint.stationName}`} />
        <InfoItem label="Operator Details" value={`${complaint.Operatorname} - ${complaint.phone}`} />
        <InfoItem label="Complaint" value={complaint.complaint} />
        <InfoItem label="Status" value={<StatusElement status={complaint.status} />} />
        <InfoItem
          label="Images"
          value={
            complaint.image ? (
              <a
                className="text-blue-600 text-decoration-none font-bold"
                href="#!"
                onClick={() => handleImageClick(complaint.image)}
              >
                View Image
              </a>
            ) : (
              "No Image"
            )
          }
        />
        <InfoItem label="Complaint Date" value={<Moment format="DD-MM-YYYY HH:mm">{complaint.createdAt}</Moment>} />
      </InfoSection>
      <ImageModal image={selectedImage} onClose={handleCloseModal} />
    </>
  );
};

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

export default ComplaintInfo;
