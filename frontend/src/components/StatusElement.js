import React from "react";

export const StatusElement = ({ status }) => {
  return (
    <>
      {status === "Resolved" ? (
        <span className="text-green-600 font-bold">{status}</span>
      ) : (
        <span className="text-red-600 font-bold">{status}</span>
      )}
    </>
  );
};
