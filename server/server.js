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
let player1Count = 0;
let player2Count = 0;
let second1 = 0;
let minute1 = 0;
let second2 = 0;
let minute2 = 0;
let readyArray = [];
let ready1Opacity = false;

let timer1ID;
var timer1 = function (room) {
   timer1ID = setInterval(function () {
    second1++;
    if(second1 % 60 === 0){
      minute1++;
      second1 = 0;
    }
    io.to(room).emit('second1', second1)
    io.to(room).emit('minute1', minute1)

  }, 1000)
}

let timer2ID;
var timer2 = function (room) {
   timer2ID = setInterval(function () {
    second2++;
    if(second2 % 60 === 0){
      minute2++;
      second2 = 0;
    }
    io.to(room).emit('second2', second2)
    io.to(room).emit('minute2', minute2)

  }, 1000)
}



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
      io.to(params.room).emit('player1Name', params.name);
      player1Count = 0;
      player2Count = 0;
      second1 = 0;
      minute1 = 0;
      second2 = 0;
      minute2 = 0;
      clearInterval(timer1ID);
      clearInterval(timer2ID);
    }

    if(users.getUserList(params.room).length === 2){
      io.to(params.room).emit('secondPlayer')
      io.to(params.room).emit('getPosition', initpositions);
      io.to(params.room).emit('clearData');
      io.to(params.room).emit('player1Name', users.getUserList(params.room)[0]);
      io.to(params.room).emit('player2Name', params.name);
      player1Count = 0;
      player2Count = 0;
      second1 = 0;
      minute1 = 0;
      second2 = 0;
      minute2 = 0;
      clearInterval(timer1ID);
      clearInterval(timer2ID);
      if(ready1Opacity === true){
        io.to(user.room).emit('ready1Opacity');
      }
    }
    callback();
  })
  socket.on('clickReady', () => {
    user = users.getUser(socket.id);
    if(user.name === users.getUserList(user.room)[0]){
      if(!readyArray.includes('player1')){
        readyArray.push('player1');
        io.to(user.room).emit('ready1Opacity');
        ready1Opacity = true;
      }
    }
    if(readyArray.length === 2){
      // io.to(user.room).emit('player1Ready')
      // io.to(user.room).emit('player2Ready')
      io.to(user.room).emit('traffic-light')
    }
  })

  socket.on('clickReady2', () => {
    user = users.getUser(socket.id);
    if(user.name === users.getUserList(user.room)[1]){
      if(!readyArray.includes('player2')){
        readyArray.push('player2');
        io.to(user.room).emit('ready2Opacity');
      }
    }
    if(readyArray.length === 2){
      // io.to(user.room).emit('player1Ready')
      // io.to(user.room).emit('player2Ready')
      io.to(user.room).emit('traffic-light')
    }
  })

  socket.on('greenlight', () => {
    user = users.getUser(socket.id);
    if(user.name === users.getUserList(user.room)[0]){
      io.to(user.room).emit('player1Ready')
      io.to(user.room).emit('player2Ready')
    }
  })



  socket.on('player1Move', (move) => {

    let user = users.getUser(socket.id);
    let userList = users.getUserList(user.room)
    if(user.name === userList[0]){
      player1Count++;
      io.to(user.room).emit('firstPlayerMove', move);
      io.to(user.room).emit('player1Count', player1Count)
    }
  })

  socket.on('start1Time', () => {
    let user = users.getUser(socket.id);
    let userList = users.getUserList(user.room)

    if(user.name === userList[0]){
      timer1(user.room);
    }
  })

  socket.on('start2Time', () => {
    let user = users.getUser(socket.id);
    let userList = users.getUserList(user.room)

    if(user.name === userList[1]){
      timer2(user.room);
    }
  })




  socket.on('player2Move', (move) => {
    let user = users.getUser(socket.id);
    let userList = users.getUserList(user.room)
    if(user.name === userList[1]){
      player2Count++;
      io.to(user.room).emit('SecondPlayerMove', move);
      io.to(user.room).emit('player2Count', player2Count)
    }
  })

  socket.on('player1Win', () => {
    let user = users.getUser(socket.id);
    if(user.name === users.getUserList(user.room)[0]){
      io.to(user.room).emit('addScore1')
      io.to(user.room).emit('clearData')
      readyArray = [];
      clearInterval(timer1ID);
      clearInterval(timer2ID);
      second1 = 0;
      minute1 = 0;
      second2 = 0;
      minute2 = 0;
      player1Count = 0;
      player2Count = 0;
      io.to(user.room).emit('firstPlayer')
      io.to(user.room).emit('secondPlayer')
      socket.on('setRandomBox', (pos) => {
        initpositions = pos;
        io.to(user.room).emit('getPosition', pos);
      })
      io.to(user.room).emit('addRecord1')
      io.to(user.room).emit('clearOpacity');
    }
  })
  socket.on('player2Win', () => {
    let user = users.getUser(socket.id);
    if(user.name === users.getUserList(user.room)[1]){
      io.to(user.room).emit('addScore2')
      io.to(user.room).emit('clearData')
      readyArray = [];
      clearInterval(timer1ID);
      clearInterval(timer2ID);
      second1 = 0;
      minute1 = 0;
      second2 = 0;
      minute2 = 0;
      io.to(user.room).emit('firstPlayer')
      io.to(user.room).emit('secondPlayer')
      socket.on('setRandomBox', (pos) => {
        initpositions = pos;
        io.to(user.room).emit('getPosition', pos);
      })
      io.to(user.room).emit('addRecord2')
      io.to(user.room).emit('clearOpacity');
    }
  })

  socket.on('reset', () => {
    user = users.getUser(socket.id)
    io.to(user.room).emit('clearData')
    io.to(user.room).emit('clearScore')
    io.to(user.room).emit('clearRecord')
    io.to(user.room).emit('clearOpacity')
    clearInterval(timer1ID)
    clearInterval(timer2ID)
    readyArray = []
    second1 = 0;
    minute1 = 0;
    second2 = 0;
    minute2 = 0;
    ready1Opacity = false;
  })




  socket.on('createMessage', (message) => {
    let user = users.getUser(socket.id);
    io.to(user.room).emit('newMessage', generateMessage(user.name, message));
  })


  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id)

    if(user){
      io.to(user.room).emit('playerList', users.getUserList(user.room))
      readyArray = [];
      ready1Opacity = false;
    }
  })
})





server.listen(port, () => {
  console.log(`The app is on port ${port}`)
})
