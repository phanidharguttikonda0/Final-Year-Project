import React, { useState } from "react";
import ReactDOM from "react-dom";

const ImamgeGen = ({ onClose }) => {
  const imageUrl = "http://localhost:5000/images/temp.png";

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative bg-white p-4 rounded-lg">
        <button
          className="absolute top-0 right-0 bg-red-600 text-white text-xl font-bold rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 transition"
          onClick={() => {
            onClose(false);
          }}
        >
          &times;
        </button>
        <img src={imageUrl} alt="UML Image" className="max-w-full max-h-full" />
      </div>
    </div>,
    document.getElementById("alert"),
  );
};

export default ImamgeGen;
