import React from "react";
import "./VerticalTimeline.css";

const VerticalTimeline = ({ statusInfo }) => {
  return (
    <div className="timeline-container">
      {statusInfo.map((item, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-content">
            <div className="timeline-date">{new Date(item.date).toLocaleString()}</div>
            <div className="timeline-status">{item.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalTimeline;
