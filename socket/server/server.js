const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const socketIO = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
});

app.use(cors());
let typingUsers = [];
let users = [];
let messages = [];

socketIO.on('connection', (socket) => {
  socket.on('message', data => {

    messages.push(data)
    socketIO.emit('messageResponse', messages)
  });

  socket.on('typing', data => {
    typingUsers.push(data)
    socket.broadcast.emit('typingResponse', users)
  })

  socket.on('stopTyping', data => {
    typingUsers = typingUsers.filter(user => user.id !== data.id)
    socket.broadcast.emit('typingResponse', typingUsers)
  })

  socket.on('newUser', data => {
    users.push(data)
    socketIO.emit('newUserResponse', users)
  })

  socket.on('disconnect', () => {
    const disconnectedMessage = {
      id: '',
      username: users.filter(user => user.id === socket.id)[0].username,
      message: '',
      event: 'disconnection',
    };
    messages.push(disconnectedMessage);
    socketIO.emit('messageResponse', messages)

    users = users.filter(user => user.id !== socket.id)
    socketIO.emit('newUserResponse', users)
    socket.disconnect()
  });
});

http.listen(5000 || process.env.PORT, () => {
  console.log('Server listening on 5000');
});
