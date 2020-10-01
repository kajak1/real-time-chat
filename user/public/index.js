import io from 'socket.io-client';

const socket = io();
const form = document.querySelector('form');
const mess = document.querySelector('#m');
const nick = document.querySelector('#n');
const ul = document.querySelector('.messages');
const typingInfo = document.querySelector('.typing');

const user = {
  // name: '',
  // status: '',
};

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

function newUserUpdate() {
  console.log('new user joined');
}

function handleFormSubmission(e) {
  e.preventDefault();
  if (mess.value != '' && nick.value != '') {
    const data = { message: mess.value, author: nick.value };
    mess.value = '';
    socket.emit('chat message', data);
    // return false;
  }
}

function addChatMessage(msg) {
  const { message, author } = msg;
  ul.innerHTML += `<li>${author}: ${message}</li>`;
  typingInfo.textContent = '';
}

askForName();

form.addEventListener('submit', handleFormSubmission);
mess.addEventListener('input', () => {
  userTyping(1500);
});

socket.on('chat message', addChatMessage);
socket.on('user typing', addTypingInfo);
socket.on('new user', newUserUpdate);
