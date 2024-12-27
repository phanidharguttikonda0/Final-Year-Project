import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Body from "./Body";

function MainBody(props) {
  return (
    <div
      className={
        !props.btns.historyButton
          ? "w-[100%] h-[100vh] transition-all duration-700"
          : "w-[85%] h-[100vh] transition-all duration-700"
      }
    >
      <Nav
        btns={{
          historyButton: props.btns.historyButton,
          changeHistory: props.btns.changeHistory,
        }}
      />
      <Body
        btns={{
          historyButton: props.btns.historyButton,
          changeHistory: props.btns.changeHistory,
        }}
        chat={props.chat}
      />
    </div>
  );
}

export default MainBody;
