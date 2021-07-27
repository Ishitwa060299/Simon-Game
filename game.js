
var gamePattern=[];
var userClickedPattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var level=0;

function nextSequence(){
  $("h1").text("Level " + level);
  level +=1;
  userClickedPattern=[];
  var randomNumber=Math.floor(Math.random()* 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var randomChosenColourId= "#" + randomChosenColour
  $(randomChosenColourId).fadeOut(100).fadeIn(100);
  var randomChosenColourSound = "sounds/"+randomChosenColour+".mp3";
    playSound(randomChosenColour);
    animatePress(randomChosenColour);

}

$(".btn").click(handler);

function handler(){
   var userChosenColour = this.id;
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length - 1);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
 function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){$("." + currentColor).removeClass("pressed");},100);
 }

var start = false;

document.addEventListener("keypress",handleKey);

function handleKey(){
  if(start === false){
    nextSequence();
    start = true;
  }
}

// if(gamePattern===userClickedPattern){
//   n=level+1;
//   while(n>=0){
//     nextSequence();
//     n--;
//   }
// }
function startOver(){
  level=0;
  gamePattern=[];
  start=false;
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
      if(gamePattern.length == userClickedPattern.length){
        setTimeout(function(){nextSequence();},1000);
      }
    }
    else{
      var over = new Audio("sounds/wrong.mp3");
      over.play();
      $("h1").text("Game over,Press Any Key to restart");
      $("body").addClass("game-over");
      setTimeout(function(){$("body").removeClass("game-over");},200);
      startOver();

    }


}
