import React, { useState, useContext } from 'react';
import UserContext from '../utils/UserContext';
import socket from '../utils/socketConfig';
import typingDelay, { typingTimeout } from '../utils/typingDelay';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [typingUser, setTypingUser] = useState([]);
  const [user] = useContext(UserContext);

  let count = 0;

  socket.on('chat update', ({ allMsg }) => {
    setMessages(allMsg);
    // count += 1;
    // console.log(count);
    // console.log(messages, count);
  });
  socket.on('startup', ({ allMsg }) => setMessages(allMsg));
  socket.on('user typing', ({ isTyping, username }) =>
    setTypingUser([isTyping, username])
  );

  return (
    <div className='chat'>
      <div className='messages-cont'>
        <ul className='messages'>
          {messages.map(([username, msg], index) => (
            <li key={index}>
              {username}: {msg}
            </li>
          ))}
        </ul>
        <ul className='typing-cont'>
          {typingUser[0] ? <li>{typingUser[1]}: is typing...</li> : <li></li>}
        </ul>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          socket.emit('chat update', { message });
          socket.emit('user typing', { isTyping: false });
          setMessage('');
        }}>
        <label htmlFor='nickname'>nickname: </label>
        <input
          name='nickname'
          value={user.username}
          id='n'
          autoComplete='off'
          disabled
        />
        <label htmlFor='message'>message: </label>
        <input
          name='message'
          id='m'
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            typingDelay(4000);
          }}
          autoComplete='off'
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Chat;
