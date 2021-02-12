import socket from './socketConfig';

function generateFunc() {
  let timer;

  return (activeRoom) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      socket.emit('get startup', { roomName: activeRoom });
    }, 100);
  };
}

const resizeHanlder = generateFunc();

export default resizeHanlder;
