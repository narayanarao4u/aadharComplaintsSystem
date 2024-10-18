import React, { useEffect } from "react";
import { toast } from "react-toastify";

import GetSummary from "./GetSummary";

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    toast("Welcome  ");
  }, []);

  return (
    <div>
      <GetSummary />
    </div>
  );
}

export default HomePage;
