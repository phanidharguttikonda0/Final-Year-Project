import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
function Name({ setName, name, close }) {
  const [isVisible, setIsVisible] = useState(true);
  const [namee, setNamee] = useState("");

  // Handle closing the alert
  const handleClose = () => {
    if (namee.length !== 0) {
      setName(namee);
      setIsVisible(false);
      setTimeout(() => {
        close(false); // Call onClose after the transition ends
      }, 700); // Match the transition duration
    } else {
      alert("Choose a name for the Chat");
    }
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
        <div className="flex flex-col items-center mt-[10%] bg-transparent p-[12%] rounded-lg shadow-cyan">
          <input
            type="text"
            placeholder="Name the Chat"
            value={namee}
            onChange={(e) => setNamee(e.target.value)}
            className="bg-transparent mb-[10%] border border-[#0ff] border-x-0 border-t-0 border-b-2 border-solid outline-0 text-2xl text-white p-1 align-text-center"
          />
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleClose}
          >
            Continue
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("name"),
  );
}

export default Name;
