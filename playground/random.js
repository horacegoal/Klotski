var nums = [1,2,3,4,5,6,7,8,9,10],
    ranNums = [],
    i = nums.length,
    j = 0;

while (i--) {
    j = Math.floor(Math.random() * (i+1));
    ranNums.push(nums[j]);
    nums.splice(j,1);
    console.log(j)
}
