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
});
