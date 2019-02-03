let orders;

function setRandomBox() {
  let initialPos = [{'top': 0, 'left': 0},{'top': 0, 'left': 100},{'top': 0, 'left': 200},{'top': 100, 'left': 0},{'top': 100, 'left': 100},{'top': 100, 'left': 200},{'top': 200, 'left': 0},{'top': 200, 'left': 100}]
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

  for(let i = 0; i < 8; i++){
    $(`#box${i+1}a`).css(ranPos[i])
  }

  getOrder();
  bubbleSort(orders);
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
    if(pos.top === 0 && pos.left === 100){
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
    if(pos.top === 100 && pos.left === 0){
      orders.push(i)
      break;
    }
  }
  for(let i = 1; i <= 8; i++){
    let pos = $(`#box${i}`).position()
    if(pos.top === 100 && pos.left === 100){
      orders.push(i)
      break;
    }
  }
  for(let i = 1; i <= 8; i++){
    let pos = $(`#box${i}`).position()
    if(pos.top === 100 && pos.left === 200){
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
    if(pos.top === 200 && pos.left === 100){
      orders.push(i)
      break;
    }
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
