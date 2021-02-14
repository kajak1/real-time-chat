import React, { useState, useEffect } from 'react';
import socket from '../../utils/socketConfig';
import CreateRoomForm from '../CreateRoomForm';
import Room from './Room';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket.on('startup', ({ rooms }) => {
      console.log('dostalem pokoje');
      setRooms(rooms);
    });
    socket.on('rooms update', ({ rooms }) => {
      setRooms(rooms);
    });

    return () => {
      socket.off('startup');
      socket.off('rooms update');
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

export default RoomList;
