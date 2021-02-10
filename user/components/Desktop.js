import React, { useContext } from 'react';
import UserContext from '../utils/UserContext';
import Chat from '../components/desktop/Chat';
import UsersList from '../components/desktop/UsersList';
import RoomsList from './desktop/RoomList';

const Desktop = () => {
  const [userInfo] = useContext(UserContext);
  return (
    <>
      <header>
        Logged as {userInfo.username}, active room: {userInfo.activeRoom}
      </header>
      <RoomsList />
      <Chat />
      <UsersList />
    </>
  );
};

export default Desktop;
