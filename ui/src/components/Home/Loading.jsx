import React, { useState } from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-white mt-4">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
