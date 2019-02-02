let allPosition = [{top: 0, left: 0},{top: 0, left: 200},{top: 0, left: 400},{top: 200, left: 0},{top: 200, left: 200},{top: 200, left: 400},{top: 400, left: 0},{top: 400, left: 200},{top: 400, left: 400}];
let orders;
let occupiedPos;
let countForBubbleSort;

$(function(){

  setRandomBox();
  getOrder();
  bubbleSort(orders);
  while(!(countForBubbleSort % 2 === 0)){
    setRandomBox();
    getOrder();
    bubbleSort(orders);
  }

  $('html').keydown(function(e){
    e.stopImmediatePropagation();
    if(e.key == "ArrowUp"){
      for(let i = 1; i <= 8; i++){
        let box = $(`#box${i}`);
        let pos = box.position();
        let emptyPos = getEmptyPosition()
        if(pos.top - 200 === emptyPos.top && pos.left === emptyPos.left){
          let top = pos.top;
          box.css("top", top - 200)
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
          if(pos.top + 200 === emptyPos.top && pos.left === emptyPos.left){
            let top = pos.top;
            box.css("top", top + 200)
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
          if(pos.left - 200 === emptyPos.left && pos.top === emptyPos.top){
            let left = pos.left;
            box.css("left", left - 200)
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
          if(pos.left + 200 === emptyPos.left && pos.top === emptyPos.top){
            let left = pos.left;
            box.css("left", left + 200)
            break;
          }
        }
        win();
    }
  });

})/////end of $(function(){})

function setRandomBox() {
  let initialPos = [{'top': 0, 'left': 0},{'top': 0, 'left': 200},{'top': 0, 'left': 400},{'top': 200, 'left': 0},{'top': 200, 'left': 200},{'top': 200, 'left': 400},{'top': 400, 'left': 0},{'top': 400, 'left': 200}]
  let ranPos = []
  let i = initialPos.length
  let j = 0;

  while (i--) {
      j = Math.floor(Math.random() * (i+1));
      ranPos.push(initialPos[j]);
      initialPos.splice(j,1);
  }
  for(let i = 0; i < 8; i++){
    $(`#box${i+1}`).css(ranPos[i])
  }
}

function getOrder () {
  orders = [];
  for(let i = 1; i <= 8; i++){
    let pos = $(`#box${i}`).position()
    if(pos.top === 0 && pos.left === 0){
      orders.push(i)
      break;
    }
  }
  for(let i = 1; i <= 8; i++){
    let pos = $(`#box${i}`).position()
    if(pos.top === 0 && pos.left === 200){
      orders.push(i)
      break;
    }
  }
  for(let i = 1; i <= 8; i++){
    let pos = $(`#box${i}`).position()
    if(pos.top === 0 && pos.left === 400){
      orders.push(i)
      break;
    }
  }
  for(let i = 1; i <= 8; i++){
    let pos = $(`#box${i}`).position()
    if(pos.top === 200 && pos.left === 0){
      orders.push(i)
      break;
    }
  }
  for(let i = 1; i <= 8; i++){
    let pos = $(`#box${i}`).position()
    if(pos.top === 200 && pos.left === 200){
      orders.push(i)
      break;
    }
  }
  for(let i = 1; i <= 8; i++){
    let pos = $(`#box${i}`).position()
    if(pos.top === 200 && pos.left === 400){
      orders.push(i)
      break;
    }
  }
  for(let i = 1; i <= 8; i++){
    let pos = $(`#box${i}`).position()
    if(pos.top === 400 && pos.left === 0){
      orders.push(i)
      break;
    }
  }
  for(let i = 1; i <= 8; i++){
    let pos = $(`#box${i}`).position()
    if(pos.top === 400 && pos.left === 200){
      orders.push(i)
      break;
    }
  }
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
  let winPos = [{top: 0, left: 0},{top: 0, left: 200},{top: 0, left: 400},{top: 200, left: 0},{top: 200, left: 200},{top: 200, left: 400},{top: 400, left: 0},{top: 400, left: 200}]
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

function bubbleSort(arr) {
  countForBubbleSort = 0;
 let end = arr.length - 1
 let sorted = false;
 while(!sorted){
   sorted = true;
   for(let i = 0; i < end; i++){
     if(arr[i] > arr[i+1]){
       swap(arr, i, i+1)
       countForBubbleSort++;
       sorted = false;
     }
   }
   end--;
 }
 return arr;
}

function swap(arr, prev, after){
 let temp = arr[prev];
 arr[prev] = arr[after];
 arr[after] = temp;
}
