
var socket = io();

function scrollToBottom () {
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child')

  var clientHeight = messages.prop('clientHeight')
  var scrollTop = messages.prop('scrollTop')
  var scrollHeight = messages.prop('scrollHeight')

  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}


socket.on('connect', function () {

  var param = $.deparam(window.location.search);
  socket.emit('join', param, function (err) {
    if(err){
      alert(err)
      window.location.href = '/';
    }else{
    }
  })
})

// socket.on('playerList', function (playerList){
//   let orderList = $('<ol></ol>')
//   console.log(playerList)
//   playerList.forEach((name) => {
//     let list = $('<li></li>').text(name);
//     orderList.append(list);
//   })
//   console.log(orderList)
//   $('#players').html(orderList);
// })
/////////BUTTON


$('#send').click(function () {
  let message = $('#textbox').val()
  if(!(message === '')){
    socket.emit('createMessage', message)
  }
})

var input = $('#textbox');
input.keyup(function(e) {
  e.preventDefault();
  if (event.keyCode === 13) {
    $('button').click();
  }
});
////////BUTTON
socket.on('newMessage', function (message) {
  let formattedDate = moment(message.createAt).format('h:mm a');
  let template = $('#message-template').html();
  let html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createAt: formattedDate
  })
  var messages = $('#messages');

  $('#messages').append(html);
  scrollToBottom();
  $('#textbox').val('');
})









///////PLAY GAME
  socket.on('player1Name', function (name) {
    $('#player1-name').text(name)
    $('#player2-name').text('?')
  })

  socket.on('player2Name', function (name) {
    $('#player2-name').text(name)
  })

  let playable1 = false;
  $('.player1boxes').hide();
  $('#ready').click(function (){
    socket.emit('clickReady');
  })

  let playable2 = false;
  $('.player2boxes').hide();
  $('#ready2').click(function (){
    socket.emit('clickReady2')
  })

  socket.on('ready1Opacity', function(){
    $('#ready').css('opacity', 1)
  })

  socket.on('ready2Opacity', function(){
    $('#ready2').css('opacity', 1)
  })

  socket.on('traffic-light', function(){
    $('#red').css('background', 'red');
    setTimeout(function(){
      $('#yellow').css('background', 'yellow')
    },1000)
    setTimeout(function(){
      $('#green').css('background', 'green')
      socket.emit('greenlight');
    },2000)
  })

  socket.on('player1Ready', function () {
    playable1 = true;
    $('.player1boxes').show();
    $('#ready').hide();
    socket.emit('start1Time')
  })

  socket.on('player2Ready', function () {
    playable2 = true;
    $('.player2boxes').show();
    $('#ready2').hide();
    socket.emit('start2Time')
  })
  let player1Second;
  socket.on('second1', (second) => {
    $('#second1').text(second);
    player1Second = second;
  })
  let player1Minute;
  socket.on('minute1', (minute) => {
    $('#minute1').text(minute);
    player1Minute = minute;
  })

  let player2Second;
  socket.on('second2', (second) => {
    $('#second2').text(second);
    player2Second = second;
  })

  let player2Minute;
  socket.on('minute1', (minute) => {
    $('#minute2').text(minute);
    player2Minute = minute;
  })

  socket.on('firstPlayer', function () {
    let pos = setRandomBox();
    socket.emit('setRandomBox', pos)
    socket.on('getPosition', function (pos) {
      for(let i = 0; i < 8; i++){
        $(`#box${i+1}`).css(pos[i])
      }
    })
  })

  socket.on('secondPlayer', function () {
    socket.on('getPosition', function (pos) {
      for(let i = 0; i < 8; i++){
        $(`#box${i+1}a`).css(pos[i])
      }
      for(let i = 0; i < 8; i++){
        $(`#box${i+1}`).css(pos[i])
      }
    })
  })

  player1Move();

  // let count = 1;
  socket.on('firstPlayerMove', function(move){
    $(`#box${move.boxNumber}`).css(move.from, move.pos + move.move)
    let win = player1Win();
    if(win){
      socket.emit('player1Win')
    }
  })

  player2Move()
  socket.on('SecondPlayerMove', function(move){
    $(`#box${move.boxNumber}a`).css(move.from, move.pos + move.move)
    let win = player2Win();
    if(win){
      socket.emit('player2Win')
    }
  })
  let playe1Count;
  socket.on('player1Count', function(count){
    $('#count1').text(count);
    player1Count = count;
  })

  let player2Count;
  socket.on('player2Count', function(count){
    $('#count2').text(count);
    player2Count = count;
  })

  socket.on('addScore1', () => {
    let score1 = $('#score1').text()
    score1 = parseInt(score1) + 1;
    $('#score1').text(score1)

  })

  socket.on('addScore2', () => {
    let score2 = $('#score2').text()
    score2 = parseInt(score2) + 1;
    $('#score2').text(score2)

  })

  socket.on('addRecord1', () => {
   let list = $('<li></li>');
   let list2 = $('<li></li>');
   let text = list.text(`WIN | COUNT: ${player1Count} TIME: ${player1Minute}:${player1Second}`);
   $('#record1').append(text);
   let lose = list2.text('LOSE');
   $('#record2').append(lose);
  })

  socket.on('addRecord2', () => {
   let list = $('<li></li>');
   let list2 = $('<li></li>');
   let text = list.text(`WIN | COUNT: ${player2Count} TIME: ${player2Minute}:${player2Second}`);
   $('#record2').append(text);
   let lose = list2.text('LOSE');
   $('#record1').append(lose);
  })




  socket.on('clearData', function () {
    $('#count1').text(0);
    $('#count2').text(0);
    $('#second1').text(0);
    $('#second2').text(0);
    $('.player1boxes').hide();
    $('#ready').show();
    $('.player2boxes').hide();
    $('#ready2').show();
    $('#red').css('background-color', 'grey')
    $('#yellow').css('background-color', 'grey')
    $('#green').css('background-color', 'grey')
  })

  $('#reset').click(function(){
    socket.emit('reset')
  })

  socket.on('clearScore', function(){
    $('#score1').text(0);
    $('#score2').text(0);
  })
  socket.on('clearRecord', function(){
    $('#record1').html('RECORD');
    $('#record2').html('RECORD');
  })
  socket.on('clearOpacity', function(){
    $('#ready').css('opacity', 0.5)
    $('#ready2').css('opacity', 0.5)
  })





//////PLAY GAME
