import React, { useState } from "react";
import icon from "../../Images/web.png";

function Nav(props) {
  return (
    <div className="h-[7vh] w-[100%] flex justify-between items-center mb-[3vh]">
      <h3 className="ml-[2%] text-2xl text-white font-sans tracking-widest font-bold ">
        {" "}
        QuinnBird{" "}
      </h3>

      <div className="flex justify-between w-[10%] items-center ml-1">
        <button className="text-white border-2 border-indigo-700 text-lg pb-[2%] pt-[2%] pl-[8%] pr-[8%] cursor-pointer rounded-lg font-mono hover:bg-gradient-to-tr from-[#5adaff] to-[#5468ff]">
          Log Out
        </button>
        <img
          src={icon}
          alt="history"
          className="cursor-pointer mr-[5%] w-[36px]"
          onClick={() => {
            props.btns.changeHistory(!props.btns.historyButton);
            console.log(props.btns.historyButton);
          }}
        />
      </div>
    </div>
  );
}

export default Nav;
