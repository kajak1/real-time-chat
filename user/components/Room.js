import React, { useContext } from 'react';
import socket from '../utils/socketConfig';
import UserContext from '../utils/UserContext';

export default function Room({ name }) {
  const [userInfo, setUserInfo] = useContext(UserContext);

  return (
    <li>
      {name}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <button
          type='submit'
          onClick={() => {
            const tmpName = userInfo.username;
            setUserInfo({ username: tmpName, activeRoom: name });
            // socket.emit('user update', userInfo);
            socket.emit('join room', { roomName: name });
          }}>
          join
        </button>
        <button onClick={() => socket.emit('delete room', { roomName: name })}>
          delete
        </button>
      </form>
    </li>
  );
}
