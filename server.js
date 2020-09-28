const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 9999;

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log(msg);
    io.emit('chat message', msg);
  });
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.listen(port);
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
