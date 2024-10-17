import React from "react";
import Moment from "react-moment";

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
            <span className="text-blue-600"> - Feedback Pending</span>
          </>
        );
      } else {
        return (
          // <SatisfactionField
          //   initialValue={row[column] === "true"}
          //   onChange={(value) => {
          //     console.log(`Updated satisfaction for row to ${value}`);
          //     // Here you would update the data in your state or backend
          //   }}
          // />
          row[column]
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
