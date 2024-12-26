import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Authentication() {
  const [core, changeCore] = useState(false);
  const [mail, changeMail] = useState("");
  const [mobile, changeMobile] = useState("");
  const [password, changePassword] = useState("");
  const navigate = useNavigate();

  const submit = () => {
    if (core) {
      // means Core Create , a new account was going to be created
    } else {
      // Core Connect
    }
    localStorage.setItem("mail", mail);
    navigate("/");
  };

  return (
    <div className="bg-[#1B2430] w-full h-svh flex justify-center items-center">
      <div className="flex flex-col items-start">
        <h2 className="text-[#0ff]  text-5xl">
          {" "}
          {core ? "Core Create" : "Core Connect"}
        </h2>
        <div className="flex flex-col items-center mt-[10%] bg-transparent p-[12%] rounded-lg shadow-cyan">
          <input
            type="email"
            placeholder="Email"
            value={mail}
            onChange={(e) => changeMail(e.target.value)}
            className="bg-transparent mb-[10%] border  border-[#0ff] border-x-0 border-t-0 border-b-2 border-solid  outline-0 text-2xl text-[white]  p-1 align-text-center "
          />
          {core ? (
            <input
              type="number"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => changeMobile(e.target.value)}
              className="bg-transparent mb-[10%] border  border-[#0ff] border-x-0 border-t-0 border-b-2 border-solid  outline-0 text-2xl text-[white] p-1 align-text-center"
            />
          ) : (
            ""
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => changePassword(e.target.value)}
            className="bg-transparent mb-[5%] border  border-[#0ff] border-x-0 border-t-0 border-b-2 border-solid  outline-0 text-2xl text-[white]  p-1 align-text-center"
          />

          {!core ? (
            <div className="flex justify-end items-center w-full mb-[5%]">
              <div className="text-gray-500 cursor-pointer underline hover:text-[#0ff]">
                forget password
              </div>
            </div>
          ) : (
            ""
          )}

          <button
            className="inline-flex items-center justify-center h-12 px-4 rounded-lg bg-gradient-to-tr from-[#5adaff] to-[#5468ff] text-white font-mono text-lg cursor-pointer transform transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-[#3c4fe0] focus:ring-inset hover:shadow-[rgba(45,_35,_66,_0.4)_0_4px_8px,_rgba(45,_35,_66,_0.3)_0_7px_13px_-3px,_#3c4fe0_0_-3px_0_inset] hover:translate-y-[-2px] active:shadow-[#3c4fe0_0_3px_7px_inset] active:translate-y-[2px] mb-[5%]"
            onClick={submit}
          >
            {core ? "Core Create" : "Core Connect"}
          </button>

          <div className="inline text-gray-500">
            {core ? "already has account " : "doesn't has an account "}
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
