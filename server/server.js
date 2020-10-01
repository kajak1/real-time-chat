const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 9999;

app.use(express.static('dist'));

const users = {};

io.on('connection', (socket) => {
  io.emit('new user');
  console.log('a user connected');

  socket.on('user login', (name) => {
    users[socket.id] = name;
    console.log(users);
  });

  socket.on('user typing', (data) => {
    socket.broadcast.emit('user typing', data);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log(`${users[socket.id]} disconnected`);
    delete users[socket.id];
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
