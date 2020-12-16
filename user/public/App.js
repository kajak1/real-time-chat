import React, { useState } from 'react';
import { render } from 'react-dom';
import Chat from '../components/Chat';
import UsersList from '../components/UsersList';
import RoomsList from '../components/RoomList';
import UserContext from '../utils/UserContext';
import socket from '../utils/socketConfig';

const App = () => {
  // const username = prompt('name');
  const username = 'imie';
  const userHook = useState({ username: username });
  socket.emit('user login', { username });
  return (
    <UserContext.Provider value={userHook}>
      <header>Logged as {username}</header>
      <Chat />
      <UsersList />
      <RoomsList />
    </UserContext.Provider>
  );
};

render(<App />, document.getElementById('root'));
