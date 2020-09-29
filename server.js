const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 9999;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('user typing', (data) => {
    // io.emit('user typing');
    socket.broadcast.emit('user typing', data);
  });

  // socket.on('user stopped typing', () => {
  //   socket.broadcast.emit('user stopped typing');
  // });

  socket.on('chat message', (msg) => {
    const { message, author } = msg;
    console.log(author, message);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
