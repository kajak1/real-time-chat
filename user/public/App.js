import React, { useState } from 'react';
import { render } from 'react-dom';
import Chat from '../components/Chat';
import UserContext from '../utils/UserContext';
import socket from '../utils/socketConfig';

const App = () => {
  const username = prompt('name');
  // const username = 'imie';
  const userHook = useState({ username: username });
  socket.emit('user login', { username });
  return (
    <UserContext.Provider value={userHook}>
      <Chat />
    </UserContext.Provider>
  );
};

render(<App />, document.getElementById('root'));
