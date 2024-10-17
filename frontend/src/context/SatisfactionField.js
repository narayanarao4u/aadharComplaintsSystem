import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const SatisfactionField = ({ onChange, initialValue = null }) => {
  const [satisfied, setSatisfied] = useState(initialValue);

  const handleChange = (value) => {
    setSatisfied(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <label className="text-lg font-medium text-gray-700">Are you satisfied?</label>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => handleChange(true)}
          className={`p-2 rounded-full transition-colors duration-200 ${
            satisfied === true
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-green-100"
          }`}
          aria-label="Yes, I'm satisfied"
        >
          <FaThumbsUp className="w-8 h-8" />
        </button>
        <button
          type="button"
          onClick={() => handleChange(false)}
          className={`p-2 rounded-full transition-colors duration-200 ${
            satisfied === false
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-red-100"
          }`}
          aria-label="No, I'm not satisfied"
        >
          <FaThumbsDown className="w-8 h-8" />
        </button>
      </div>
      {satisfied !== null && (
        <p className="text-sm text-gray-600">
          You selected: {satisfied ? "Satisfied" : "Not Satisfied"}
        </p>
      )}
    </div>
  );
};

export default SatisfactionField;
