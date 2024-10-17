import React from 'react'
import styled from 'styled-components';
import Moment from "react-moment";
import { GrEdit } from "react-icons/gr";
import { ComplaintListContext } from './ComplaintList';

//Display List Component
const DisplayList = () => {
    const { complaints, selectComplaint, handleImageClick } = React.useContext(ComplaintListContext);
  
    return (
      <DIV>
        <h2>Complaint List</h2>
        <table >
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
              <td>{complaint.status}</td>
  
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

export default DisplayList