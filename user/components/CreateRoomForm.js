import React, { useState } from 'react';
import socket from '../utils/socketConfig';

const CreateRoomForm = () => {
  const [roomName, setRoomName] = useState('');

  return (
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
  );
};

export default CreateRoomForm;
