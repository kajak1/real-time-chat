import io from 'socket.io-client';
import List from '../List';

const socket = io();
const form = document.querySelector('form');
const mess = document.querySelector('#m');
const nick = document.querySelector('#n');
const messageList = document.querySelector('.messages');
const typingCont = document.querySelector('.typing-cont');

const usersList = new List();

const user = {
  name,
  rooms: [],
  activeRoom: 'global',
};

function askForName() {
  const username = prompt('enter your name');
  if (username != '') {
    socket.emit('user login', { username });
  }
  user.name = username;
  user.rooms.push('global');
  nick.value = username;
}

function checkIfExistsAndRemove(user) {
  const tag = typingCont.querySelector(`#${user}`);
  if (tag != null) {
    typingCont.removeChild(tag);
  }
}

function typingTimeout() {
  socket.emit('user typing', { isTyping: false, user: user });
}

const userTyping = (function () {
  let timeout = null;
  return function (delay) {
    socket.emit('user typing', { isTyping: true, user: user });
    clearTimeout(timeout);
    timeout = setTimeout(typingTimeout, delay);
  };
})();

function addTypingInfo({ isTyping, user: { name } }) {
  let typingTag;
  if (typingCont.querySelector(`#${name}`) == null) {
    typingTag = document.createElement('li');
    typingTag.setAttribute('id', name);
  } else {
    typingTag = typingCont.querySelector(`#${name}`);
  }

  if (isTyping) {
    typingTag.textContent = `${name} is typing...`;
    typingCont.appendChild(typingTag);
  } else {
    checkIfExistsAndRemove(name);
  }
}

function updateRoomList() {}

function handleFormSubmission(e) {
  e.preventDefault();
  if (mess.value != '' && nick.value != '') {
    const data = {
      message: mess.value,
      user: user,
      html: `<li>${user.name}: ${mess.value}</li>`,
    };
    mess.value = '';
    socket.emit('chat new message', data);
  }
}

function addChatMessage({ allMsg, user: userTag }) {
  messageList.innerHTML = allMsg;
  checkIfExistsAndRemove(userTag);
}

askForName();

form.addEventListener('submit', handleFormSubmission);
mess.addEventListener('input', () => {
  userTyping(4000);
});

socket.on('chat new message', addChatMessage);
socket.on('user typing', addTypingInfo);
socket.on('new user', usersList.addUser.bind(usersList));
socket.on('remove user', usersList.removeUser.bind(usersList));
socket.on('list room update', updateRoomList);
