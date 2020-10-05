const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 9999;
const Messages = require('./Messages');

app.use(express.static('dist'));

const users = {};
const messages = new Messages();

io.on('connection', (socket) => {
  socket.on('user login', (name) => {
    console.log('a user connected', name);
    users[socket.id] = name;
    io.emit('new user', { users: users, user: users[socket.id] });
    console.log(users);
  });

  socket.on('user typing', (data) => {
    socket.broadcast.emit('user typing', data);
  });

  socket.on('chat new message', ({ html }) => {
    messages.add(html);
    io.emit('chat new message', messages.allMsg);
  });

  socket.on('disconnect', () => {
    console.log(`${users[socket.id]} disconnected`);
    io.emit('remove user', users[socket.id]);
    delete users[socket.id];
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
