import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { render } from "react-dom";
import Desktop from "../components/Desktop";
import Mobile from "../components/Mobile";
import UserContext from "../utils/UserContext";
import resizeHanlder from "../utils/resizeHandler";
import Login from "../components/Login";

const App = () => {
  const userHook = useState({ username: "", activeRoom: "global" });
  const [logged, setLogged] = useState(false);

  const isDesktop = useMediaQuery({
    query: "(min-width: 425px)",
  });

  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

  useEffect(() => {
    window.addEventListener("resize", () => {
      resizeHanlder();
    });
  }, []);

  return (
    <>
      {!logged ? (
        <Login userHook={userHook} loggedHook={[logged, setLogged]}></Login>
      ) : (
        <UserContext.Provider value={userHook}>
          {isDesktop && <Desktop></Desktop>}
          {isMobile && <Mobile></Mobile>}
        </UserContext.Provider>
      )}
    </>
  );
};

render(<App />, document.getElementById("root"));
