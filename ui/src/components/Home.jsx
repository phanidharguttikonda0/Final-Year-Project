import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import History from "./Home/History";
import Nav from "./Home/Nav";
import Body from "./Home/Body";
import MainBody from "./Home/MainBody";
import axios from "axios";

function Home(props) {
  const navigate = useNavigate();
  const [historyButton, changeHistory] = useState(true);
  const [newChat, changenewChat] = useState(true);
  // we will take out all the history items over here
  const [historyItems, setHistoryItems] = useState([]);
  const [changeHistoryValues, setChangeHistory] = useState(false); // is called when chat is added
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("mail") === null) {
      console.log("Mail Id was not detected");
      navigate("/authentication");
    } else {
      async function main() {
        const response = await axios.post(
          "http://localhost:5000/home/get-history-items",
          {
            email: localStorage.getItem("mail"),
          },
        );

        if (response.data.value) {
          console.log(response.data.value);
          setHistoryItems(response.data.value);
        } else {
          console.log("Problem with getting History Items");
        }
      }
      main();
    }
  }, [navigate, changeHistoryValues]);

  return (
    <div className="flex justify-start items-center bg-[#1B2430] w-[100%] h-[100vh] transition-all duration-700">
      <MainBody
        btns={{ historyButton, changeHistory }}
        chat={{ newChat, changenewChat }}
        selectedChat={{ selectedItem, setSelectedItem }}
        history={{ historyItems, setHistoryItems }}
      />
      <div
        className={`transition-all duration-700 ${
          historyButton ? "w-[20%]" : "w-0"
        } h-[100vh] bg-[#0e131a] overflow-hidden`}
      >
        {historyButton && (
          <History
            chat={{ newChat, changenewChat }}
            items={historyItems}
            selectedChat={{ selectedItem, setSelectedItem }}
          />
        )}
      </div>
    </div>
  );
} // transition-all duration-500 transform

export default Home;
