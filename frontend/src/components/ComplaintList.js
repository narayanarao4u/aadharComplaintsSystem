import React, { useEffect, useState } from "react";
import api from "../api";
import ComplaintUpdate from "./ComplaintUpdate";
import DisplayList from "./DisplayList";

export const ComplaintListContext = React.createContext();

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const fetchComplaints = async () => {
    const response = await api.get("api/complaints");
    setComplaints(response.data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const selectComplaint = (complaint) => {
    setSelectedComplaint(complaint);
  };

  return (
    <ComplaintListContext.Provider
      value={{
        complaints,
        setComplaints,
        selectedComplaint,
        setSelectedComplaint,
        selectComplaint,
      }}
    >
      <div>
        {selectedComplaint ? (
          <ComplaintUpdate
            complaint={selectedComplaint}
            onComplaintUpdate={(updatedComplaint) => {
              setComplaints(complaints.map((c) => (c._id === updatedComplaint._id ? updatedComplaint : c)));
              setSelectedComplaint(null);
            }}
          />
        ) : (
          <DisplayList />
        )}
      </div>
    </ComplaintListContext.Provider>
  );
};

export default ComplaintList;
