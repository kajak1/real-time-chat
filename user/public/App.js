import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { render } from "react-dom";
import Desktop from "../components/Desktop";
import Mobile from "../components/Mobile";
import UserContext from "../utils/UserContext";
import socket from "../utils/socketConfig";
import resizeHanlder from "../utils/resizeHandler";

const App = () => {
  // const username = prompt("name");
  const username = "imie";
  const userHook = useState({ username: username, activeRoom: "global" });

  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

  useEffect(() => {
    socket.emit("user login", { username });

    window.addEventListener("resize", () => {
      resizeHanlder();
    });
  }, []);

  return (
    <UserContext.Provider value={userHook}>
      {isDesktop && <Desktop></Desktop>}
      {isMobile && <Mobile></Mobile>}
    </UserContext.Provider>
  );
};

render(<App />, document.getElementById("root"));
