import React, { useState } from "react";
import axios from "axios";
import ImamgeGen from "./ImamgeGen";
import Loading from "./Loading";
const CodeEditor = ({ code }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [openImage, CloseImage] = useState(false);
  const [loading, stopLoading] = useState(false);
  const handleCopy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => console.error("Failed to copy code: ", err));
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md w-full max-w-3xl mb-[2%]">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">Generated Code</h3>
        <button
          onClick={handleCopy}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition duration-300"
        >
          {copySuccess ? "Copied!" : "Copy Code"}
        </button>
      </div>

      {openImage && <ImamgeGen onClose={CloseImage} />}
      {loading && <Loading />}
      {/* Code Editor */}
      <pre className="overflow-auto bg-gray-900 rounded p-4 text-md flex justify-start items-center whitespace-pre-wrap text-left">
        <code className="">{code}</code>
      </pre>

      <button
        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition duration-300 mt-[2%]"
        onClick={async () => {
          stopLoading(true);
          const res = await axios.post("http://localhost:5000/home/image", {
            umlCode: code,
          });
          if (res.data.value) {
            // we are going to render the image from /home/phani/final year project/Application/server/Controllers/Image.png
            stopLoading(false);
            CloseImage(true);
          } else {
            alert(res.data.message);
          }
        }}
      >
        Get UML
      </button>
    </div>
  );
};

export default CodeEditor;
