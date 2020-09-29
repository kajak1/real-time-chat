const socket = io();
const form = document.querySelector('form');
const mess = document.querySelector('#m');
const nick = document.querySelector('#n');
const ul = document.querySelector('.messages');
const typingInfo = document.querySelector('.typing');

function typingTimeout() {
  typing = false;
  socket.emit('user typing', typing);
}

const userTyping = (function () {
  let typing = false;
  let timeout = null;
  return function () {
    typing = true;
    socket.emit('user typing', { typing: typing });
    clearTimeout(timeout);
    timeout = setTimeout(typingTimeout, 1000);
  };
})();

function addTypingInfo({ typing }) {
  if (typing) {
    typingInfo.textContent = 'user is typing';
  } else {
    typingInfo.textContent = '';
  }
}

function removeTypingInfo() {
  ul.lastChild.parentNode.removeChild(ul.lastChild);
}

function handleFormSubmission(e) {
  e.preventDefault();
  if (mess.value != '' && nick.value != '') {
    const data = { message: mess.value, author: nick.value };
    socket.emit('chat message', data);
    return false;
  }
}

function addChatMessage(msg) {
  const { message, author } = msg;
  ul.innerHTML += `<li>${author}: ${message}</li>`;
}

form.addEventListener('submit', handleFormSubmission);

mess.addEventListener('input', () => {
  userTyping();
  // socket.emit('user typing');
});

socket.on('chat message', addChatMessage);

socket.on('user typing', addTypingInfo);

// socket.on('user stopped typing', removeTypingInfo);
