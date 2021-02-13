import socket from './socketConfig';

function generateFunc() {
  let timer;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      socket.emit('get startup');
    }, 100);
  };
}

const resizeHanlder = generateFunc();

export default resizeHanlder;
