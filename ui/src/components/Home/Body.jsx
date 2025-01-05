import React, { useState, useRef, useEffect } from "react";
import { FaLink } from "react-icons/fa";
import neural from "../../Images/electronic.png";
import { HiArrowUp } from "react-icons/hi";
import CodeEditor from "./CodeEditor";
import Alert from "../Alert";
import axios from "axios";
import Name from "./Name";
import Loading from "./Loading.jsx";
import Choice from "./Choice.jsx";

function Body(props) {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const [enterName, setenterName] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  // if the selectedItem value is not null body should contain the that item chat

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <div className="w-[100%] h-[90vh] overflow-scroll no-scrollbar ">
      {loading && <Loading />}
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
                  {file && (
                    <p className="mt-4 text-gray-600">
                      Selected file: {file.name}
                    </p>
                  )}
                </div>

                <Choice
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />

                <button
                  onClick={async () => {
                    // when this button was clicked , we are going to add the new chat in to the data-base and also in to the history items
                    // and we will set the new selected item value in to the historyItems.length - 1 index
                    // we need to check whether the file is given or not and prompt.length should be not zero
                    if (text.length !== 0) {
                      if (file !== null) {
                        if (name !== null) {
                          console.log("Completed with name ", name);
                          setLoading(true);
                          const formData = new FormData();

                          // Append the form fields
                          formData.append(
                            "email",
                            localStorage.getItem("mail"),
                          ); // Email from localStorage
                          formData.append("prompt", text); // User input prompt
                          formData.append("model", "BERT"); // Model type
                          formData.append("name", name); // Chat name
                          formData.append("file", file); // File object (from an input or another source)
                          formData.append("uml", selectedOption);
                          try {
                            const response = await axios.post(
                              "http://localhost:5000/home/new-chat",
                              formData,
                              {
                                headers: {
                                  "Content-Type": "multipart/form-data", // Automatically set by axios when using FormData
                                },
                              },
                            );

                            console.log("Response:", response.data);
                            if (response.data.value) {
                              setLoading(false);
                            }
                            console.log(" the response was ", response.data); // we need to get added chat item
                            props.history.setHistoryItems([
                              ...props.history.historyItems,
                              response.data.chatData,
                            ]); // now it appears in the historyItems
                            // now we need to open that chat
                            props.selectedChat.setSelectedItem(
                              props.history.historyItems.length,
                            );
                            props.chat.changenewChat(false);
                            setText("");
                            setName(null);
                            setFile(null);
                            setSelectedOption(0);
                            // selectedItem = {{selectedItemObject, setSelectedItemObject}}
                            props.selectedItem.setSelectedItemObject(
                              response.data.chatData.conversation,
                            );
                          } catch (error) {
                            console.error("Error sending the request:", error);
                          }
                        } else {
                          setenterName(true);
                        }
                      } else {
                        setAlertMessage("Select SRS Document");
                        setAlert(true);
                      }
                    } else {
                      setAlertMessage("Prompt is Needed");
                      setAlert(true);
                    }
                  }}
                  className="cursor-pointer rounded-3xl bg-white p-[1%] shadow-cyan transform transition-transform duration-200 hover:scale-95 active:scale-90"
                >
                  <HiArrowUp className="text-[#0e131a] text-4xl" />
                </button>
              </div>
              {
                // here we are going to render Alert Component
                alert ? <Alert message={alertMessage} onClose={setAlert} /> : ""
              }
              {enterName ? (
                <Name setName={setName} name={name} close={setenterName} />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-[90%] mb-[15%]">
          {}
          {props.selectedItem.selectedItemObject.map((element, index) => {
            console.log(` The Element Was ${element.name} ${element.output}`);
            return (
              <div key={index} className="flex flex-col items-start w-[100%]">
                <div className="w-[100%] flex justify-start items-center">
                  <img src={neural} alt="" className={`w-[48px] mr-[1%]`} />
                  <h2 className="text-2xl text-white bg-[#2f3d4f] p-[1%] rounded text-left ">
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
            <div className="ml-[1%]">
              <Choice
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>
            <button
              onClick={() => {
                // here
                const index = props.selectedChat.selectedItem;
                async function main() {
                  const newConversation = {
                    email: localStorage.getItem("mail"),
                    chatIndex: index,
                    prompt: text,
                    model: "BERT",
                    uml: selectedOption,
                  };
                  const response = await axios.post(
                    "http://localhost:5000/home/post-chat",
                    newConversation,
                  );

                  console.log(response.data);
                  if (response.data.value) {
                    // now we are going to add the new conversation to the selectedItem
                    //
                    setLoading(false);
                    console.log(
                      props.selectedItem.selectedItemObject,
                      "  hell o",
                    );
                    props.selectedItem.setSelectedItemObject([
                      ...props.selectedItem.selectedItemObject,
                      response.data.output,
                    ]);
                    setText("");
                    setSelectedOption(0);
                  } else {
                    setLoading(false);
                  }
                }

                setLoading(true);
                main();
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
