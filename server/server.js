const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 9999;
const Messages = require('./Messages');
const Users = require('./Users');
const Rooms = require('./Rooms');

app.use(express.static('dist'));

const messages = new Messages();
const users = new Users();
const rooms = new Rooms();

io.on('connection', (socket) => {
  socket.on('user login', ({ username }) => {
    users.add(socket.id, username);
    socket.join('global');
    rooms.addUser(socket.id, 'global');
    console.log(`${socket.id} joined global room`);

    socket.emit('startup', {
      allMsg: messages.allMsg,
      users: rooms.global.users,
      rooms: rooms.getAllRooms(),
    });

    socket.broadcast.to('global').emit('users update', {
      users: rooms.global.users,
    });
  });

  socket.on('user typing', ({ isTyping }) => {
    const username = users.allUsers[socket.id].username;
    socket.broadcast.emit('user typing', { isTyping, username });
  });

  socket.on('chat update', ({ message }) => {
    const username = users.allUsers[socket.id].username;
    messages.add({ username, message });
    io.emit('chat update', { allMsg: messages.allMsg });
  });

  socket.on('disconnect', () => {
    if (Object.keys(users.allUsers).length != 0) {
      console.log(`${socket.id} disconnected`);
    }
    users.remove(socket.id);
    rooms.removeUserFromRoom(socket.id, 'global');
    io.emit('users update', { users: rooms.global.users });
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
