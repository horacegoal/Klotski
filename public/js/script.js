
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
  console.log('server connected')

  var param = $.deparam(window.location.search);
  socket.emit('join', param, function (err) {
    if(err){
      alert(err)
      window.location.href = '/';
    }else{
      console.log('join success')
    }
  })
})

socket.on('playerList', function (playerList){
  let orderList = $('<ol></ol>')
  console.log(playerList)
  playerList.forEach((name) => {
    let list = $('<li></li>').text(name);
    orderList.append(list);
  })
  console.log(orderList)
  $('#players').html(orderList);
})
/////////BUTTON
$('button').click(function () {
  let message = $('#textbox').val()
  socket.emit('createMessage', message)
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

  socket.on('firstPlayer', function () {
    let pos = setRandomBox();
    socket.emit('setRandomBox', pos)
    socket.on('getPosition', function (pos) {
      for(let i = 0; i < 8; i++){
        $(`#box${i+1}`).css(pos[i])
      }
    })
  })

  player1Move();
  socket.on('firstPlayerMove', function(move){
    console.log(move)
    $(`#box${move.boxNumber}`).css(move.from, move.pos + move.move)
    player1Win();
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
  player2Move()
  socket.on('SecondPlayerMove', function(move){
    console.log(move)
    $(`#box${move.boxNumber}a`).css(move.from, move.pos + move.move)
    player2Win();
  })





//////PLAY GAME
