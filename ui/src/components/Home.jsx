import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("mail") === null) {
      console.log("Mail Id was not detected");
      navigate("/authentication");
    }
  }, [navigate]);

  return <div> Welcome {localStorage.getItem("mail")}</div>;
}

export default Home;
