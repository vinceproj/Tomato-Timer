//Grab Buttons
const topButton = document.getElementById("startButton");
const midButton = document.getElementById("breakButton");
const botButton = document.getElementById("stopButton");

//Grab Tomato Counters
const tomOne = document.getElementById("counterOne");
const tomTwo = document.getElementById("counterTwo");
const tomThree = document.getElementById("counterThree");
const tomFour = document.getElementById("counterFour");

//Grab UI Related
const spriteMessage = document.getElementById("messageText");
const timerDisplay = document.getElementById("timerDisplay");

var timer = {
  currTime: 1500,
  topBtnState: 0,
  midBtnState: 0,
  botBtnState: 0,
  tomOneState: false,
  tomTwoState: false,
  tomThreeState: false,
  tomFourState: false
};

topButton.addEventListener("click", () => {
  runStateTop();
});

midButton.addEventListener("click", () => {
  runStateMid();
});

botButton.addEventListener("click", () => {
  runStateBot();
});

function runTimer() {
  timer.currTime--;
  timerDisplay.innerHTML =
    parseInt(timer.currTime / 60) +
    ":" +
    ("0" + (timer.currTime % 60)).slice(-2);
}

var timerHolder = [];

function runStateTop() {
  if (
    (timer.topBtnState == 0) &
    (timer.midBtnState == 0) &
    (timer.botBtnState == 0)
  ) {
    timerHolder = setInterval(runTimer, 1000);
    timer.topBtnState = 1;
    return;
  }
  if (
    (timer.topBtnState == 1) &
    (timer.midBtnState == 0) &
    (timer.botBtnState == 0)
  ) {
    clearInterval(timerHolder);
    timer.topBtnState = 0;
    return;
  }
}

function runStateMid() {}

function runStateBot() {}
