import React, { useState, useEffect } from 'react';
import socket from '../../utils/socketConfig';
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

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className='rooms-list-cont'>
      <ul>
        {rooms.map((room, index) => (
          <Room roomName={room} key={index} />
        ))}
      </ul>
      <form
        className='create-room-form'
        onSubmit={(e) => {
          e.preventDefault();
          if (/\W+/.test(roomName)) {
            return;
          }
          socket.emit('create room', { roomName });
          setRoomName('');
        }}>
        <div className='wrapper'>
          <input
            id='room-name'
            name='room-name'
            type='text'
            value={roomName}
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
            autoComplete='off'
            required
          />
          <label className='input-label' htmlFor='room-name'>
            room name
          </label>
        </div>
        <button type='submit'>Create Room</button>
      </form>
    </div>
  );
};

export default RoomDropdown;
