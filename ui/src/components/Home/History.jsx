import React, { useState } from "react";

function History(props) {
  return (
    <div
      className={
        "flex flex-col  h-[100vh] items-start ml-[5%] mr-[5%] pt-[5%] pb-[5%]"
      }
    >
      <h3 className="font-mono tracking-wider text-2xl text-white mb-[1%]">
        {" "}
        History{" "}
      </h3>
      <button
        onClick={() => {
          props.chat.changenewChat(!props.chat.newChat);
        }}
        className={`flex justify-center items-center text-white w-[100%] text-xl mt-[5%] mb-[5%] ml-[2%] mr-[2%] border-2 border-gray-400 rounded-lg p-[3%]`}
      >
        <h2 className="pr-[5%]"> + </h2>
        New Chat
      </button>

      <div className="flex "></div>
    </div>
  );
}

export default History;
