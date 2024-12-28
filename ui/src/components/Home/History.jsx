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
          props.chat.changenewChat(true);
          props.selectedChat.setSelectedItem(null);
        }}
        className={`flex justify-center items-center text-white w-[100%] text-xl mt-[5%] mb-[5%] ml-[2%] mr-[2%] border-2 border-gray-400 rounded-lg p-[3%]`}
      >
        <h2 className="pr-[5%]"> + </h2>
        New Chat
      </button>

      <div className=" w-[100%] flex flex-col overflow-y-scroll overflow-x-hidden mt-[4%] mb-[4%] mr-[2%] items-start text-lg text-white font-mono no-scrollbar">
        {props.items
          .slice()
          .reverse()
          .map((element, index) => {
            console.log(index);
            if (!element.name) return "";
            return (
              <h3
                key={props.items.length - index - 1}
                onClick={() => {
                  // selectedItem, setSelectedItem
                  props.selectedChat.setSelectedItem(
                    props.items.length - index - 1,
                  );
                  props.chat.changenewChat(false);
                }}
                className="whitespace-pre text-xl cursor-pointer bg- p-[1%] inset-1/2%] mb-[2%] mr-[2%] opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                {element.name.trim()}
              </h3>
            );
          })}
      </div>
    </div>
  );
}

export default History;
