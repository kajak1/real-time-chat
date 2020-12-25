import React, { useState, useEffect } from 'react';
import socket from '../utils/socketConfig';
import Room from './Room';

const RoomDropdown = () => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    socket.on('startup', ({ rooms }) => {
      setRooms(rooms);
    });
    socket.on('rooms update', ({ rooms }) => {
      setRooms(rooms);
    });
  }, []);

  return (
    <div>
      <ul>
        {rooms.map((room, index) => (
          <Room roomName={room} key={index} />
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (/\W+/.test(roomName)) {
            return;
          }
          socket.emit('create room', { roomName });
          setRoomName('');
        }}>
        <label htmlFor='room-name'>
          <input
            type='text'
            value={roomName}
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
          />
          room name
        </label>
        <button type='submit'>Create Room</button>
      </form>
    </div>
  );
};

export default RoomDropdown;
