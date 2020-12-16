import React, { useState } from 'react';
import { render } from 'react-dom';
import Chat from '../components/Chat';
import List from '../components/List';
import RoomDropdown from '../components/RoomDropdown';
import UserContext from '../utils/UserContext';
import socket from '../utils/socketConfig';

const App = () => {
  // const username = prompt('name');
  const username = 'imie';
  const userHook = useState({ username: username });
  socket.emit('user login', { username });
  return (
    <UserContext.Provider value={userHook}>
      <Chat />
      <List />
      <RoomDropdown />
    </UserContext.Provider>
  );
};

render(<App />, document.getElementById('root'));
