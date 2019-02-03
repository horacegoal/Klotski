// let allPosition = [{top: 0, left: 0},{top: 0, left: 100},{top: 0, left: 200},{top: 100, left: 0},{top: 100, left: 100},{top: 100, left: 200},{top: 200, left: 0},{top: 200, left: 100},{top: 200, left: 200}];

function player1 () {

  let occupiedPos;
  
  $('html').keydown(function(e){
    if(e.key == "ArrowUp"){
      for(let i = 1; i <= 8; i++){
        let box = $(`#box${i}`);
        let pos = box.position();
        let emptyPos = getEmptyPosition()
        if(pos.top - 100 === emptyPos.top && pos.left === emptyPos.left){
          let top = pos.top;
          box.css("top", top - 100)
          break;
        }
      }
        win();
    }
    if(e.key == "ArrowDown"){
      for(let i = 1; i <= 8; i++){
        let box = $(`#box${i}`);
        let pos = box.position();
        let emptyPos = getEmptyPosition()
          if(pos.top + 100 === emptyPos.top && pos.left === emptyPos.left){
            let top = pos.top;
            box.css("top", top + 100)
            break;
          }
      }
        win();
    }
    if(e.key == "ArrowLeft"){
        for(let i = 1; i <= 8; i++){
          let box = $(`#box${i}`);
          let pos = box.position();
          let emptyPos = getEmptyPosition()
          if(pos.left - 100 === emptyPos.left && pos.top === emptyPos.top){
            let left = pos.left;
            box.css("left", left - 100)
            break;
          }
        }
        win();
    }
    if(e.key == "ArrowRight"){
        for(let i = 1; i <= 8; i++){
          let box = $(`#box${i}`);
          let pos = box.position();
          let emptyPos = getEmptyPosition()
          if(pos.left + 100 === emptyPos.left && pos.top === emptyPos.top){
            let left = pos.left;
            box.css("left", left + 100)
            break;
          }
        }
        win();
    }
  });

  function getOccupiedPosition () {
    occupiedPos = [];
    for(let i = 1; i <= 8; i++){
      let box = $(`#box${i}`);
      let pos = box.position();
      occupiedPos.push(pos)
    }
    return occupiedPos;
  }

  function getEmptyPosition () {
    getOccupiedPosition();
    for(let i = 0; i < allPosition.length; i++){
      let matches = [];
      for(let j = 0; j < occupiedPos.length; j++){
        if(allPosition[i].top === occupiedPos[j].top && allPosition[i].left === occupiedPos[j].left){
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

  function win () {
    let winPos = [{top: 0, left: 0},{top: 0, left: 100},{top: 0, left: 200},{top: 100, left: 0},{top: 100, left: 100},{top: 100, left: 200},{top: 200, left: 0},{top: 200, left: 100}]
    let res = [];
    for(let i = 0; i < winPos.length; i++){
      if(getOccupiedPosition()[i].top === winPos[i].top && getOccupiedPosition()[i].left == winPos[i].left){
        res.push(true);
      }
    }
    if(res.length === 8){
      alert('good job!')
    }
  }
}
