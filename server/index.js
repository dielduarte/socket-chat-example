const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.send('ok');
});

io.on('connection', function (socket) {
  socket.on('send_message', function (data) {
    socket.broadcast.emit('new_message', data);
  });

  socket.on('user_start_typing', function (data) {
    socket.broadcast.emit('new_user_writing', data);
  });

  socket.on('user_stop_typing', function (data) {
    socket.broadcast.emit('user_stop_writing', data);
  });
});
