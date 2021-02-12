import React, { useState, useEffect } from 'react';
import socket from '../../utils/socketConfig';
import CreateRoomForm from '../CreateRoomForm';
import Room from './Room';

const RoomDropdown = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // socket.emit('get startup', { roomName: user.activeRoom });

    socket.on('startup', ({ rooms }) => {
      setRooms(rooms);
    });
    socket.on('rooms update', ({ rooms }) => {
      setRooms(rooms);
    });

    return () => {
      socket.off('startup');
      socket.off('room update');
    };
  }, []);

  return (
    <div className='rooms-list-cont'>
      <ul>
        {rooms.map((room, index) => (
          <Room roomName={room} key={index} />
        ))}
      </ul>
      <CreateRoomForm></CreateRoomForm>
    </div>
  );
};

export default RoomDropdown;
