const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 9999;
const Messages = require('./Messages');

app.use(express.static('dist'));

const messages = new Messages();
const users = {};
const rooms = {
  global,
};

io.on('connection', (socket) => {
  socket.on('user login', ({ username }) => {
    users[socket.id] = { username: username };
    socket.join('global');
    rooms.global[socket.id] = { username: username };
    console.log(`${username} joined global room`);
    console.log(users);
    io.to('global').emit('new user', { users: users, user: users[socket.id] });
  });

  socket.on('user typing', (data) => {
    const targetRoom = data.user.activeRoom;
    io.to(`${targetRoom}`).emit('user typing', data);
  });

  socket.on('chat new message', ({ html, user }) => {
    messages.add(html);
    io.to(user.rooms[0]).emit('chat new message', {
      allMsg: messages.allMsg,
      user: user.name,
    });
  });

  socket.on('disconnect', () => {
    console.log(users);
    // aa
    if (Object.keys(users).length != 0) {
      console.log(`${users[socket.id].username} disconnected`);
      io.emit('remove user', users[socket.id].username);
    }
    delete users[socket.id];
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
