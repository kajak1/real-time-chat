import React, { useState } from 'react';
import socket from '../utils/socketConfig';

const RoomDropdown = () => {
  const [rooms, setRooms] = useState([]);
  socket.on('startup', ({ rooms }) => {
    setRooms(rooms);
    console.log(rooms);
  });
  socket.on('rooms update', ({ rooms }) => setRooms(rooms));

  return (
    <select name='rooms' id=''>
      <option>All</option>
      {rooms.map((room, index) => (
        <option key={index}>{room}</option>
      ))}
    </select>
  );
};
export default RoomDropdown;
