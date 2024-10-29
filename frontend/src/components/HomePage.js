import React from "react";
import { Link } from "react-router-dom";
import GetSummary from "./GetSummary";
import { FaPlusCircle } from "react-icons/fa";


import VideoPlayer from "./VideoPlayer ";

function HomePage() {
  const videoSource = '/videos/AadharComplaints.mp4'; // Replace with your video path
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <GetSummary />
      <Link to="/complaints" className="flex items-center gap-2 font-bold bg-blue-500 text-4xl text-white px-4 py-2 rounded">
        <FaPlusCircle /> <span>New Complaint</span>
      </Link>
      <br />
      <VideoPlayer videoSrc={videoSource} />
    </div>
  );
}

export default HomePage;
