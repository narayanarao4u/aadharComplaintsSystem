import React, { useState } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import { GrEdit } from "react-icons/gr";
import { ComplaintListContext } from "./ComplaintList";
import { StatusElement } from "./StatusElement";
import ImageModal from "./ImageModal";

const DisplayList = () => {
  const { complaints, selectComplaint } = React.useContext(ComplaintListContext);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <DIV>
      <table>
        <thead>
          <tr className="bg-gray-500 text-yellow-200">
            <th>
              <abbr title="Complaint"> ID </abbr>
            </th>
            <th>Date/Time</th>
            <th>Station</th>
            <th>AEK ID</th>
            <th>Complaint</th>
            <th>Images</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id}>
              <td className="text-bold">{complaint.complaintID}</td>
              <td>
                <Moment format="DD-MM-YYYY HH:mm">{complaint.createdAt}</Moment>
              </td>
              <td>{complaint.stationName}</td>
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
                  <span>No Image </span>
                )}
              </td>
              <td>
                <StatusElement status={complaint.status} />
              </td>
              <td>
                <button onClick={() => selectComplaint(complaint)}>
                  <GrEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ImageModal image={selectedImage} onClose={handleCloseModal} />
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
    padding: 4px;
    border-left: 1px solid lightgrey;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export default DisplayList;
