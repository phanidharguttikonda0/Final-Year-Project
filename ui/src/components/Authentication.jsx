import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert";

function Authentication() {
  const [core, changeCore] = useState(false);
  const [mail, changeMail] = useState("");
  const [mobile, changeMobile] = useState("");
  const [password, changePassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [local, setLocal] = useState(localStorage.getItem("mail"));
  useEffect(() => {
    if (local !== null) {
      navigate("/");
    }
  }, [local, navigate]);

  const submit = async () => {
    let url = "";
    let object = {};
    if (core) {
      // means Core Create , a new account was going to be created
      url = "http://localhost:5000/register";
      object = { email: mail, mobile, password };
    } else {
      // Core Connect
      url = "http://localhost:5000/login";
      object = { email: mail, password };
    }

    try {
      const response = await axios.post(url, object);

      if (response.data.value) {
        localStorage.setItem("mail", mail);
        navigate("/");
      } else {
        setMessage(response.data.message);
        setAlert(true);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setAlert(true);
    }
  };

  return (
    <div className="bg-[#1B2430] w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-start">
        <h2 className="text-[#0ff] text-5xl">
          {core ? "Core Create" : "Core Connect"}
        </h2>
        <div className="flex flex-col items-center mt-[10%] bg-transparent p-[12%] rounded-lg shadow-cyan">
          <input
            type="email"
            placeholder="Email"
            value={mail}
            onChange={(e) => changeMail(e.target.value)}
            className="bg-transparent mb-[10%] border border-[#0ff] border-x-0 border-t-0 border-b-2 border-solid outline-0 text-2xl text-white p-1 align-text-center"
          />
          {core && (
            <input
              type="number"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => changeMobile(e.target.value)}
              className="bg-transparent mb-[10%] border border-[#0ff] border-x-0 border-t-0 border-b-2 border-solid outline-0 text-2xl text-white p-1 align-text-center"
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => changePassword(e.target.value)}
            className="bg-transparent mb-[5%] border border-[#0ff] border-x-0 border-t-0 border-b-2 border-solid outline-0 text-2xl text-white p-1 align-text-center"
          />
          {alert && <Alert message={message} onClose={setAlert} />}
          {!core && (
            <div className="flex justify-end items-center w-full mb-[5%]">
              <div className="text-gray-500 cursor-pointer underline hover:text-[#0ff]">
                Forgot password
              </div>
            </div>
          )}

          <button
            className="inline-flex items-center justify-center h-12 px-4 rounded-lg bg-gradient-to-tr from-[#5adaff] to-[#5468ff] text-white font-mono text-lg cursor-pointer transform transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-[#3c4fe0] focus:ring-inset hover:shadow-[rgba(45,_35,_66,_0.4)_0_4px_8px,_rgba(45,_35,_66,_0.3)_0_7px_13px_-3px,_#3c4fe0_0_-3px_0_inset] hover:translate-y-[-2px] active:shadow-[#3c4fe0_0_3px_7px_inset] active:translate-y-[2px] mb-[5%]"
            onClick={submit}
          >
            {core ? "Core Create" : "Core Connect"}
          </button>

          <div className="inline text-gray-500">
            {core ? "Already have an account? " : "Doesn't have an account? "}
            <div
              className="inline text-gray-500 cursor-pointer underline hover:text-[#0ff]"
              onClick={() => changeCore(!core)}
            >
              {core ? "Core Connect" : "Core Create"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
