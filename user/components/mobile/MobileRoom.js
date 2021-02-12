import React, { useContext } from 'react';
import UserContext from '../../utils/UserContext';
import socket from '../../utils/socketConfig';

const MobileRoom = ({ roomName, onPress }) => {
  const [userInfo, setUserInfo] = useContext(UserContext);

  function handleJoinClick(roomName) {
    if (userInfo.activeRoom != roomName) {
      setUserInfo({ username: userInfo.username, activeRoom: roomName });
      socket.emit('join room', {
        roomName: roomName,
        activeRoomName: userInfo.activeRoom,
      });
    }
  }

  function handleDeleteClick(roomName) {
    if (roomName === 'global') return;
    socket.emit('delete room', { roomName: roomName });
  }

  return (
    <li>
      <button
        className='manage-room join-room-button'
        onClick={() => {
          handleJoinClick(roomName);
          onPress();
          // setIsChatOpened(!isChatOpened);
        }}>
        {roomName}
      </button>
      <button
        className='manage-room delete-room-button'
        onClick={() => handleDeleteClick(roomName)}>
        Delete
      </button>
    </li>
  );
};

export default MobileRoom;
