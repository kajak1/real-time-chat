import React, { useState, useContext } from 'react';
import UserContext from '../../utils/UserContext';
import socket from '../../utils/socketConfig';
import Chat from './Chat';

const MobileRoom = ({ roomName }) => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [isChatOpened, setIsChatOpened] = useState(false);

  function handleJoinClick(roomName) {
    setUserInfo({ username: userInfo.username, activeRoom: roomName });
    socket.emit('join room', {
      roomName: roomName,
      activeRoomName: userInfo.activeRoom,
    });
  }

  function handleDeleteClick(roomName) {
    if (roomName === 'global') return;
    socket.emit('delete room', { roomName: roomName });
  }

  return (
    <li>
      <button
        className='join-room-button'
        onClick={() => {
          handleJoinClick(roomName);
          setIsChatOpened(!isChatOpened);
        }}>
        {roomName}
      </button>
      <button
        className='delete-room-button'
        onClick={() => handleDeleteClick(roomName)}>
        Delete
      </button>
      {isChatOpened && <Chat></Chat>}
    </li>
  );
};

export default MobileRoom;
