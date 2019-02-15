function player1Win () {
  let winPos = [{top: 0, left: 0},{top: 0, left: 100},{top: 0, left: 200},{top: 100, left: 0},{top: 100, left: 100},{top: 100, left: 200},{top: 200, left: 0},{top: 200, left: 100}]
  let res = [];
  for(let i = 0; i < winPos.length; i++){
    if(getOccupiedPosition()[i].top === winPos[i].top && getOccupiedPosition()[i].left == winPos[i].left){
      res.push(true);
    }
  }
  if(res.length === 8){
    // alert('Player 1 wins')
    return true;
  }

  function getOccupiedPosition () {
    occupiedPos = [];
    for(let i = 1; i <= 8; i++){
      let box = $(`#box${i}`);
      let pos = box.position();
      occupiedPos.push(pos)
    }
    return occupiedPos;
  }
}
