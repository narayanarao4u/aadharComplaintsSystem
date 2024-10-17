import React from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const ComplaintHisTable = ({ data }) => {
  const columns = ["complaintID", "createdAt", "complaint", "satisfied"];
  const colHead = ["ID", "Date", "Complaint", "Status"];

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const renderCell = (row, column) => {
    if (column === "status") {
      return row[column];
    }

    if (column === "createdAt") {
      return <Moment format="DD-MM-YYYY">{row[column]}</Moment>;
    }

    if (column === "satisfied") {
      if (row.status === "Pending") {
        return <span className="text-red-600 font-bold">Pending</span>;
      } else if (row.status === "Resolved" && row[column] === null) {
        return (
          <>
            <span className="text-green-600 font-bold">Complaint Resloved - </span>
            <span className="text-blue-600 font-bold underline">
              <Link to={`/feedback/${row._id}`}> - Feedback Pending</Link>
            </span>
          </>
        );
      } else {
        return (
          <>
            <span className="flex space-x-4">
              <span className="text-green-600 font-bold">Complaint Resloved</span>
              <span
                className={`p-2 rounded-full transition-colors duration-200 ${
                  row.satisfied === true ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
                aria-label="Yes, I'm satisfied"
              >
                {row.satisfied === true ? <FaThumbsUp className="w-4 h-4" /> : <FaThumbsDown className="w-4 h-4" />}
              </span>
            </span>
          </>
        );
      }
    }

    return row[column];
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-500">
            {colHead.map((column, index) => (
              <th key={index} className="py-2 px-4 border-b text-left font-semibold text-gray-100">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-2 px-4 border-b">
                  {/* {row[column]} */}
                  {renderCell(row, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintHisTable;
