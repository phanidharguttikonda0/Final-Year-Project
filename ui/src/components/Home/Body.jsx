import React, { useState, useRef } from "react";
import { FaLink } from "react-icons/fa";

import { HiArrowUp } from "react-icons/hi";

function Body(props) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const [fileName, setFileName] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="w-[100%] h-[90vh] overflow-scroll no-scrollbar">
      {props.chat.newChat ? (
        <div className="w-[100%] h-[90vh] flex justify-center items-center">
          <div className="w-[80%] ">
            <div className="flex flex-col items-start p-[5%] bg-[#0e131a] rounded-xl">
              <textarea
                ref={textareaRef}
                value={text}
                placeholder="Message QuinnBird"
                onChange={(e) => {
                  setText(e.target.value);
                  const textarea = textareaRef.current;
                  textarea.style.height = "auto"; // Reset height
                  textarea.style.height = `${Math.min(textarea.scrollHeight, 256)}px`;
                }}
                className={`
                  font-mono w-full  text-2xl border border-gray-300 rounded-md resize-none overflow-hidden
                  focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent shadow-cyan text-white
                  p-[2%] mb-[3%]
                  `}
                style={{ maxHeight: "12rem" }} // Limit to 5-6 lines
              />

              <div className="flex justify-between w-[100%] items-center">
                {/* Hidden file input */}
                <div>
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {/* Custom label for the file input */}
                  <label
                    htmlFor="fileInput"
                    className="flex items-center justify-center gap-2 text-blue-500 hover:underline cursor-pointer"
                  >
                    <FaLink className="text-blue-500" />
                    <span>Upload a file</span>
                  </label>
                  {fileName && (
                    <p className="mt-4 text-gray-600">
                      Selected file: {fileName}
                    </p>
                  )}
                </div>

                <button className="cursor-pointer rounded-3xl bg-white p-[1%] shadow-cyan transform transition-transform duration-200 hover:scale-95 active:scale-90">
                  {" "}
                  <HiArrowUp className="text-[#0e131a] text-4xl" />{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=""> </div>
      )}
    </div>
  );
}

export default Body;
