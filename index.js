let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").html("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);

  addAnimation("#" + randomChoosenColor);
  playSound(randomChoosenColor);
}

function playSound(color) {
  let filePath = "sounds/" + color + ".mp3";
  // console.log(filePath);
  let audio = new Audio(filePath);
  audio.play();
}

function addAnimation(idValue) {
  $(idValue).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(currentColor) {
  $(currentColor).addClass("pressed");
  setTimeout(function () {
    $(currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer() {
  let lastIndex = userClickedPattern.length - 1;

  if (userClickedPattern[lastIndex] === gamePattern[lastIndex]) {
    if (userClickedPattern.length === gamePattern.length) {
      console.log("Success");
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Failed");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  $("h1").html("Game over! Press any key to restart.");
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}

$(".btn").on("click", function (event) {
  let userChoosenColor = event.target.id;
  userClickedPattern.push(userChoosenColor);

  addAnimation("#" + userChoosenColor);
  animatePress("#" + userChoosenColor);
  playSound(userChoosenColor);

  checkAnswer();
});

$(document).on("keypress", function () {
  if (!started) {
    started = true;
    $("h1").html("Level " + level);
  }
  nextSequence();
});
