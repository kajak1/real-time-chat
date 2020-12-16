import socket from './socketConfig';

function typingTimeout() {
  socket.emit('user typing', { isTyping: false });
}

const userTyping = (function () {
  let timeout = null;
  return function (delay) {
    socket.emit('user typing', { isTyping: true });
    clearTimeout(timeout);
    timeout = setTimeout(typingTimeout, delay);
  };
})();

export { typingTimeout };
export default userTyping;
