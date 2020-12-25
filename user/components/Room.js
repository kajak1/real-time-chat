import React, { useContext } from 'react';
import socket from '../utils/socketConfig';
import UserContext from '../utils/UserContext';

export default function Room({ roomName }) {
  const [userInfo, setUserInfo] = useContext(UserContext);

  return (
    <li>
      {roomName}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <button
          type='submit'
          onClick={() => {
            if (roomName === userInfo.activeRoom) return;
            const tmpName = userInfo.username;
            setUserInfo({ username: tmpName, activeRoom: roomName });
            socket.emit('join room', {
              roomName: roomName,
              activeRoomName: userInfo.activeRoom,
            });
          }}>
          join
        </button>
        <button
          onClick={() => {
            if (roomName === 'global') return;
            socket.emit('delete room', { roomName: roomName });
          }}>
          delete
        </button>
      </form>
    </li>
  );
}
