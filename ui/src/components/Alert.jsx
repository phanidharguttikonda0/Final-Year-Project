import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function Alert({ message, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger the open transition when the component mounts
  useEffect(() => {
    setIsVisible(true);
    // Automatically close after 4 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000); // Adjust time to suit your preference

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  // Handle closing the alert
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose(false); // Call onClose after the transition ends
    }, 700); // Match the transition duration
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center transition-all duration-700 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-[#1B2430] p-6 rounded flex flex-col items-center shadow-cyan transition-all duration-700 transform ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        <h2 className="text-xl text-[#0ff] font-bold mb-4 font-mono">
          {message}
        </h2>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>,
    document.getElementById("alert"),
  );
}

export default Alert;
