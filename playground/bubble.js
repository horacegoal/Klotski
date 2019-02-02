function bubbleSort (arr) {
  let end = arr.length - 1
  let sorted = false;
  while(!sorted){
    sorted = true;
    for(let i = 0; i < end; i++){
      if(arr[i] > arr[i+1]){
        swap(arr, i, i+1)
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

let arr1 = [2,6,3,8,5,90,1,6,2,6,4,5]
let sortedArray = bubbleSort(arr1);
console.log(sortedArray)
