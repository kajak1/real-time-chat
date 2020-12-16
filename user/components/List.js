import React, { useState } from 'react';
import socket from '../utils/socketConfig';

const List = () => {
  const [users, setUsers] = useState([]);
  socket.on('startup', ({ users }) => setUsers(users));
  socket.on('users update', ({ users }) => setUsers(users));

  return (
    <ul className='users-list'>
      {users.map((username, index) => (
        <li key={index}>{username}</li>
      ))}
    </ul>
  );
};

export default List;
