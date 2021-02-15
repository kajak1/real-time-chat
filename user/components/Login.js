import React, { useState } from "react";
import socket from "../utils/socketConfig";

const Login = ({ userHook, loggedHook }) => {
  const [userInfo, setUserInfo] = userHook;
  const [logged, setLogged] = loggedHook;
  const [username, setUsername] = useState("");

  const { activeRoom } = userInfo;

  function handleFormSubmission(e) {
    e.preventDefault();
    if (/\W+/.test(username)) {
      return;
    }
    setUserInfo({ username: username, activeRoom: activeRoom });
    setLogged(!logged);
    socket.emit("user login", { username });
  }

  return (
    <form action="">
      <label htmlFor="username">Username: </label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <button type="submit" onClick={handleFormSubmission}>
        Log in
      </button>
    </form>
  );
};

export default Login;
