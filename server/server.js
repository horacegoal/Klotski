const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js')
const {isRealString} = require('./utils/validator.js')
const {Users} = require('./utils/users.js')
const publicPath = path.join(__dirname, '../public/');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

let initpositions;


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('server connected')
  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Display name or room name invalid')
    }
    if(users.getUserList(params.room).length === 2){
      return callback('The room is full')
    }

      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('playerList', users.getUserList(params.room));
    if(users.getUserList(params.room).length === 1){
      io.to(params.room).emit('firstPlayer')
      socket.on('setRandomBox', (pos) => {
        initpositions = pos;
        io.to(params.room).emit('getPosition', pos);
      })
    }

    if(users.getUserList(params.room).length === 2){
      io.to(params.room).emit('secondPlayer')
      io.to(params.room).emit('getPosition', initpositions);
    }
    callback();
  })

  socket.on('player1Move', (move) => {

    let user = users.getUser(socket.id);
    let userList = users.getUserList(user.room)
    // console.log(move)
    if(user.name === userList[0]){
      io.to(user.room).emit('firstPlayerMove', move);
    }
  })

  socket.on('player2Move', (move) => {

    let user = users.getUser(socket.id);
    let userList = users.getUserList(user.room)
    // console.log(move)
    if(user.name === userList[1]){
      io.to(user.room).emit('SecondPlayerMove', move);
    }
  })





  socket.on('createMessage', (message) => {
    let user = users.getUser(socket.id);
    io.to(user.room).emit('newMessage', generateMessage('user', message));
  })


  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id)

    if(user){
      io.to(user.room).emit('playerList', users.getUserList(user.room))
    }
  })
})





server.listen(port, () => {
  console.log(`The app is on port ${port}`)
})
