import io from 'socket.io-client';
import List from '../List';

const socket = io();
const form = document.querySelector('form');
const mess = document.querySelector('#m');
const nick = document.querySelector('#n');
const messageList = document.querySelector('.messages');
const typingInfo = document.querySelector('.typing');

const usersList = new List();

const user = {};

function askForName() {
  user.name = prompt('enter your name');
  if (user.name != '') {
    socket.emit('user login', user.name);
  }
  nick.value = user.name;
}

function typingTimeout() {
  socket.emit('user typing', { isTyping: false });
}

const userTyping = (function () {
  let timeout = null;
  return function (delay) {
    socket.emit('user typing', { isTyping: true, user: user.name });
    clearTimeout(timeout);
    timeout = setTimeout(typingTimeout, delay);
  };
})();

function addTypingInfo({ isTyping, user }) {
  if (isTyping) {
    typingInfo.textContent = `${user} is typing...`;
  } else {
    typingInfo.textContent = '';
  }
}

function addUserToList(user) {
  console.log(user);
  // let p = '';
  // for (const key in users) {
  //   p += `<li id="${users[key]}">${users[key]}</li>`;
  // }
  usersList.innerHTML += `<li id="${user}">${user}</li>`;
  // usersList.innerHTML += `<li>${user}</li>`;
  console.log('new user joined');
}

function handleFormSubmission(e) {
  e.preventDefault();
  if (mess.value != '' && nick.value != '') {
    const data = {
      message: mess.value,
      author: nick.value,
      html: `<li>${nick.value}: ${mess.value}</li>`,
    };
    mess.value = '';
    socket.emit('chat new message', data);
    // return false;
  }
}

function addChatMessage(msg) {
  // console.log(JSON.stringify(msg));
  messageList.innerHTML = msg;
  typingInfo.textContent = '';
}

function removeUserFromList(user) {
  const userTag = document.querySelector(`#${user}`);
  userTag.parentNode.removeChild(userTag);
}

askForName();

form.addEventListener('submit', handleFormSubmission);
mess.addEventListener('input', () => {
  userTyping(2500);
});

socket.on('chat new message', addChatMessage);
socket.on('user typing', addTypingInfo);
socket.on('new user', usersList.addUser.bind(usersList));
socket.on('remove user', usersList.removeUser.bind(usersList));
