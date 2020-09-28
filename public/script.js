const socket = io();
const form = document.querySelector('form');
const input = document.querySelector('#m');
const ul = document.querySelector('ul');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value != '') {
    socket.emit('chat message', input.value);
    input.value = '';
    return false;
  }
});

socket.on('chat message', (msg) => {
  ul.innerHTML += `<li>${msg}</li>`;
});
