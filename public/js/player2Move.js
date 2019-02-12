

function player2Move () {

  let allPosition = [{top: 0, left:  0},{top: 0, left: 100},{top: 0, left: 200},{top: 100, left: 0},{top: 100, left: 100},{top: 100, left: 200},{top: 200, left: 0},{top: 200, left: 100},{top: 200, left: 200}];

  let occupiedPos2;

  $('html').keydown(function(e){
    e.stopImmediatePropagation();
    if(e.key == "ArrowUp"){
      for(let i = 1; i <= 8; i++){
        let box = $(`#box${i}a`);
        let pos = box.position();
        let emptyPos = getEmptyPosition()
        if(pos.top - 100 === emptyPos.top && pos.left === emptyPos.left){
          let top = pos.top;
          // box.css("top", top - 100)
          let moveObject = {boxNumber: i, from: "top", pos: top, move: -100};
          socket.emit('player2Move', moveObject)
          break;
        }
      }
    }
    if(e.key == "ArrowDown"){
      for(let i = 1; i <= 8; i++){
        let box = $(`#box${i}a`);
        let pos = box.position();
        let emptyPos = getEmptyPosition()
          if(pos.top + 100 === emptyPos.top && pos.left === emptyPos.left){
            let top = pos.top;
            // box.css("top", top + 100)
            let moveObject = {boxNumber: i, from: "top", pos: top, move: 100};
            socket.emit('player2Move', moveObject)
            break;
          }
      }
    }
    if(e.key == "ArrowLeft"){
        for(let i = 1; i <= 8; i++){
          let box = $(`#box${i}a`);
          let pos = box.position();
          let emptyPos = getEmptyPosition()
          if(pos.left - 100 === emptyPos.left && pos.top === emptyPos.top){
            let left = pos.left;
            // box.css("left", left - 100)
            let moveObject = {boxNumber: i, from: "left", pos: left, move: -100};
            socket.emit('player2Move', moveObject)
            break;
          }
        }
    }
    if(e.key == "ArrowRight"){
        for(let i = 1; i <= 8; i++){
          let box = $(`#box${i}a`);
          let pos = box.position();
          let emptyPos = getEmptyPosition()
          if(pos.left + 100 === emptyPos.left && pos.top === emptyPos.top){
            let left = pos.left;
            // box.css("left", left + 100)
            let moveObject = {boxNumber: i, from: "left", pos: left, move: 100};
            socket.emit('player2Move', moveObject)
            break;
          }
        }
    }
  });






  function getOccupiedPosition () {
    occupiedPos2 = [];
    for(let i = 1; i <= 8; i++){
      let box = $(`#box${i}a`);
      let pos = box.position();
      occupiedPos2.push(pos)
    }
    return occupiedPos2;
  }

  function getEmptyPosition () {
    getOccupiedPosition();
    for(let i = 0; i < allPosition.length; i++){
      let matches = [];
      for(let j = 0; j < occupiedPos2.length; j++){
        if(allPosition[i].top === occupiedPos2[j].top && allPosition[i].left === occupiedPos2[j].left){
          matches.push(true)
        }else{
          matches.push(false)
        }
      }
      if(!matches.includes(true)){
        return allPosition[i]
      }
    }
  }

  // function win () {
  //   let winPos = [{top: 0, left: 0},{top: 0, left: 100},{top: 0, left: 200},{top: 100, left: 0},{top: 100, left: 100},{top: 100, left: 200},{top: 200, left: 0},{top: 200, left: 100}]
  //   let res = [];
  //   for(let i = 0; i < winPos.length; i++){
  //     if(getOccupiedPosition()[i].top === winPos[i].top && getOccupiedPosition()[i].left == winPos[i].left){
  //       res.push(true);
  //     }
  //   }
  //   if(res.length === 8){
  //     alert('good job!')
  //   }
  // }

}
