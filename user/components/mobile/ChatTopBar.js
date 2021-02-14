import React, { useContext } from "react";
import UserContext from "../../utils/UserContext";
import { FaRegHandPointLeft } from "react-icons/fa";

const ChatTopBar = ({ onPress }) => {
  const [userInfo] = useContext(UserContext);

  return (
    <nav>
      <button onClick={onPress} className="go-back-button">
        <FaRegHandPointLeft></FaRegHandPointLeft>
      </button>
      <div className="room-image">{userInfo.activeRoom[0].toUpperCase()}</div>
      <span className="room-name">{userInfo.activeRoom}</span>
    </nav>
  );
};

export default ChatTopBar;
