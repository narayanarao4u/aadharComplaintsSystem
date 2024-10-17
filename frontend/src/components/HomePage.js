import React, { useEffect  } from "react";
import { toast } from "react-toastify";

import GetSummary from "./GetSummary";

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
     toast("Welcome  ");
  }, []);

  return (
    <div>
      {/* <h1>Aadhar Complaint Management System</h1>
      <p>This is the home page of the Aadhar Complaint Management System.</p> */}
      <h2>Complaints</h2>
      <GetSummary />
    </div>
  );
}

export default HomePage;
