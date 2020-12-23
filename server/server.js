const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 9999;
const Users = require('./Users');
const Rooms = require('./Rooms');

app.use(express.static('dist'));

const users = new Users();
const rooms = new Rooms();

io.on('connection', (socket) => {
  socket.on('user login', ({ username }) => {
    users.add(socket.id, username);
    socket.join('global');
    rooms.addUser(socket.id, 'global');
    console.log(`${socket.id} joined global room`);

    socket.emit('startup', {
      allMsg: rooms.global.messages,
      users: rooms.global.users,
      rooms: rooms.getAllRooms(),
    });

    socket.broadcast.to('global').emit('users update', {
      users: rooms.global.users,
    });
  });

  socket.on('user typing', ({ isTyping }) => {
    const username = users.allUsers[socket.id].username;
    const activeRoom = users.allUsers[socket.id].activeRoom;
    socket.to(activeRoom).broadcast.emit('user typing', { isTyping, username });
  });

  socket.on('chat update', ({ message }) => {
    const username = users.allUsers[socket.id].username;
    const activeRoom = users.allUsers[socket.id].activeRoom;
    rooms.addMessage({ username, message }, activeRoom);
    io.to(activeRoom).emit('chat update', {
      allMsg: rooms[activeRoom].messages,
    });
  });

  socket.on('join room', ({ roomName }) => {
    socket.join(roomName);
    users.changeRoom(socket.id, roomName);
    rooms.addUser(socket.id, roomName);
    socket.emit('startup', {
      allMsg: rooms[roomName].messages,
      users: rooms[roomName].users,
      rooms: rooms.getAllRooms(),
    });

    // console.log('xddd', users.allUsers[socket.id]);
  });

  socket.on('create room', ({ roomName }) => {
    rooms.add(roomName);
    io.emit('rooms update', { rooms: rooms.getAllRooms() });
  });

  socket.on('delete room', ({ roomName }) => {
    rooms.delete(roomName);
    io.emit('rooms update', { rooms: rooms.getAllRooms() });
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
