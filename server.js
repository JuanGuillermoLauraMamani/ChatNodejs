const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(__dirname));

server.listen(4000, function (err) {
  if (err) throw err;
  console.log('Servidor escuchando en http://localhost:4000');
});


io.on('connection', function (socket) {

  console.log('Usuario conectado.');


  socket.on('disconnect', function () {
    console.log('Usuario desconectado.');
  });

  socket.on('new:message', function (data) {

    const {
      username,
      value
    } = data;

    socket.broadcast.emit('new:message', data);

    console.log(`Nuevo mensaje: Usuario="${username}", Contenido="${value}".`);
  });
});