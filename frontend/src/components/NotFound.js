import React from 'react';

export const NotFound = () => {
  return (
    <div className=" bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-6 py-12">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800 mb-4">404</h1>
        <div className="mb-8">
          <div className="h-1 w-16 bg-indigo-500 mx-auto rounded-full"></div>
        </div>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-500 text-lg mb-8">
          Sorry, the page you are looking for does not exist or you're not authorized to access it.
        </p>
        <button 
          onClick={() => window.history.back()} 
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium 
                     hover:bg-indigo-700 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;