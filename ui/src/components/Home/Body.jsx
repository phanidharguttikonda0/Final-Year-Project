import React, { useState, useRef, useEffect } from "react";
import { FaLink } from "react-icons/fa";
import neural from "../../Images/electronic.png";
import { HiArrowUp } from "react-icons/hi";
import CodeEditor from "./CodeEditor";

function Body(props) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const [fileName, setFileName] = useState(null);

  // if the selectedItem value is not null body should contain the that item chat

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="w-[100%] h-[90vh] overflow-scroll no-scrollbar mb-[2%]">
      {props.chat.newChat && props.selectedChat.selectedItem === null ? (
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
                style={{ maxHeight: "12rem" }}
              />

              <div className="flex justify-between w-[100%] items-center">
                <div>
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={handleFileChange}
                  />

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

                <button
                  onClick={() => {
                    // when this button was clicked , we are going to add the new chat in to the data-base and also in to the history items
                    // and we will set the new selected item value in to the historyItems.length - 1 index
                  }}
                  className="cursor-pointer rounded-3xl bg-white p-[1%] shadow-cyan transform transition-transform duration-200 hover:scale-95 active:scale-90"
                >
                  {" "}
                  <HiArrowUp className="text-[#0e131a] text-4xl" />{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-[90%] h-[90vh] mb-[40%] ">
          {}
          {props.history.historyItems[
            props.selectedChat.selectedItem
          ].conversation.map((element, index) => {
            return (
              <div key={index} className="flex flex-col items-start w-[100%]">
                <div className="w-[100%] flex justify-start items-center">
                  <img src={neural} alt="" className={`w-[48px] mr-[1%]`} />
                  <h2 className="text-2xl text-white bg-[#2f3d4f] p-[1%] rounded">
                    {" "}
                    {element.prompt.trim()}{" "}
                  </h2>
                </div>
                <div className="flex mt-[2%]  justify-center w-[100%]">
                  <CodeEditor code={element.output.trim()} />
                </div>
              </div>
            );
          })}
          <div className="w-[70%] flex justify-center items-center p-[1%] bg-[#0e131a] rounded-xl absolute bottom-[1%] left-[5%]">
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
                font-mono w-full  text-xl border border-gray-300 rounded-md resize-none overflow-hidden
                focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent shadow-cyan text-white
                p-[1%] mb-[1%]
                `}
              style={{ maxHeight: "12rem" }}
            />

            <button
              onClick={() => {
                // when this button was clicked , we are going to add the new chat in to the data-base and also in to the history items
                // and we will set the new selected item value in to the historyItems.length - 1 index
              }}
              className="ml-[1%] cursor-pointer rounded-3xl bg-white p-[1rem] shadow-cyan transform transition-transform duration-200 hover:scale-95 active:scale-90"
            >
              {" "}
              <HiArrowUp className="text-[#0e131a] text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Body;
