import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../utils/UserContext';
import socket from '../utils/socketConfig';
import MobileRoom from './mobile/MobileRoom';
import CreateRoomForm from './CreateRoomForm';
import Chat from './mobile/Chat';

const Mobile = () => {
  const [userInfo] = useContext(UserContext);
  const [rooms, setRooms] = useState([]);
  const [isChatOpened, setIsChatOpened] = useState(false);

  useEffect(() => {
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
    <>
      <header>
        Hi, {userInfo.username}, you are in {userInfo.activeRoom}
      </header>
      <div className='menu'>
        <ul className='room-list'>
          {rooms.map((roomName, index) => (
            <MobileRoom
              roomName={roomName}
              key={index}
              onPress={() => setIsChatOpened(!isChatOpened)}
            />
          ))}
        </ul>
        <CreateRoomForm></CreateRoomForm>
        <button>new message</button>
      </div>
      {isChatOpened && <Chat></Chat>}
    </>
  );
};

export default Mobile;

// <form
//   className='create-room-form'
//   onSubmit={(e) => {
//     e.preventDefault();
//     if (/\W+/.test(roomName)) {
//       return;
//     }
//     socket.emit('create room', { roomName });
//     setRoomName('');
//   }}>
//   <div className='wrapper'>
//     <input
//       id='room-name'
//       name='room-name'
//       type='text'
//       value={roomName}
//       onChange={(e) => {
//         setRoomName(e.target.value);
//       }}
//       autoComplete='off'
//       required
//     />
//     <label className='input-label' htmlFor='room-name'>
//       room name
//     </label>
//   </div>
//   <button type='submit'>Create Room</button>
// </form>
