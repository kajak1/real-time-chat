import React, { useContext } from 'react';
import socket from '../../utils/socketConfig';
import UserContext from '../../utils/UserContext';

export default function Room({ roomName }) {
  const [userInfo, setUserInfo] = useContext(UserContext);

  function handleJoinClick(roomName) {
    if (roomName === userInfo.activeRoom) return;
    const tmpName = userInfo.username;
    setUserInfo({ username: tmpName, activeRoom: roomName });
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
      {roomName}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <button type='submit' onClick={() => handleJoinClick(roomName)}>
          join
        </button>
        <button onClick={() => handleDeleteClick(roomName)}>delete</button>
      </form>
    </li>
  );
}
