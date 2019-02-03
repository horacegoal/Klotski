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
