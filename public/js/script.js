let allPosition = [{top: 0, left: 0},{top: 0, left: 100},{top: 0, left: 200},{top: 100, left: 0},{top: 100, left: 100},{top: 100, left: 200},{top: 200, left: 0},{top: 200, left: 100},{top: 200, left: 200}];
let countForBubbleSort;

$(function(){
  let windowCenter = $(window).width()/2;
  $('.game-area').css('left', windowCenter - 400)
  $('.game-area2').css('left', windowCenter + 100)

  setRandomBox();

  while(!(countForBubbleSort % 2 === 0)){
    setRandomBox();
    console.log(countForBubbleSort)

  }

  player1()
  player2()

})/////end of $(function(){})
