import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import History from "./Home/History";
import Nav from "./Home/Nav";
import Body from "./Home/Body";
import MainBody from "./Home/MainBody";
function Home(props) {
  const navigate = useNavigate();
  const [historyButton, changeHistory] = useState(true);
  const [newChat, changenewChat] = useState(true);
  // we will take out all the history items over here

  useEffect(() => {
    if (localStorage.getItem("mail") === null) {
      console.log("Mail Id was not detected");
      navigate("/authentication");
    }
  }, [navigate]);

  return (
    <div className="flex justify-start items-center bg-[#1B2430] w-[100%] h-[100vh] transition-all duration-700">
      <MainBody
        btns={{ historyButton, changeHistory }}
        chat={{ newChat, changenewChat }}
      />
      <div
        className={`transition-all duration-700 ${
          historyButton ? "w-[20%]" : "w-0"
        } h-[100vh] bg-[#0e131a] overflow-hidden`}
      >
        {historyButton && <History chat={{ newChat, changenewChat }} />}
      </div>
    </div>
  );
} // transition-all duration-500 transform

export default Home;
