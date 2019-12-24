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

//Grab Audio
/*Thank you to Kenny.nl for the free audio assets!*/
var workAudio = new Audio("../assets/audio/workStart.ogg");
var breakAudio = new Audio("../assets/audio/breakStart.ogg");

//Timer object
var timer = {
  currTime: 1500,
  afterCycle: false,
  afterAllCycle: false,
  topBtnState: 0,
  midBtnState: 0,
  botBtnState: 0,
  tomOneState: false,
  tomTwoState: false,
  tomThreeState: false,
  tomFourState: false
};

//Add Button Handlers
topButton.addEventListener("click", () => {
  runStateTop();
});

midButton.addEventListener("click", () => {
  runStateMid();
});

botButton.addEventListener("click", () => {
  runStateBot();
});

//Add Break Functions
function afterOneCycle() {
  spriteMessage.innerHTML = "Good work, time for your break!";
  timer.topBtnState = 1;
  timer.midBtnState = 1;
  midButton.innerHTML = "Skip";
  topButton.innerHTML = "Pause";
  timer.currTime = 300;
  timerHolder = setInterval(runTimer, 1000);
  timer.afterCycle = true;
}

function afterFullCycle() {
  spriteMessage.innerHTML = "Congrats, time for a long break!";
  timer.topBtnState = 1;
  timer.botBtnState = 1;
  botButton.innerHTML = "Skip";
  topButton.innerHTML = "Pause";
  timer.currTime = 900;
  timerHolder = setInterval(runTimer, 1000);
  timer.afterAllCycle = true;
}

//Add Decision Handlers
function tomatoHandler() {
  if (
    (timer.tomOneState == false) &
    (timer.tomTwoState == false) &
    (timer.tomThreeState == false) &
    (timer.tomFourState == false)
  ) {
    timer.tomOneState = true;
    tomOne.style.backgroundImage = "url('../assets/img/counterReady.png')";
    timerDisplay.innerHTML = "5:00";
    setTimeout(afterOneCycle, 1000);
    return;
  } else if (
    (timer.tomOneState == true) &
    (timer.tomTwoState == false) &
    (timer.tomThreeState == false) &
    (timer.tomFourState == false)
  ) {
    timer.tomTwoState = true;
    tomTwo.style.backgroundImage = "url('../assets/img/counterReady.png')";
    timerDisplay.innerHTML = "5:00";
    setTimeout(afterOneCycle, 1000);
    return;
  } else if (
    (timer.tomOneState == true) &
    (timer.tomTwoState == true) &
    (timer.tomThreeState == false) &
    (timer.tomFourState == false)
  ) {
    timer.tomThreeState = true;
    tomThree.style.backgroundImage = "url('../assets/img/counterReady.png')";
    timerDisplay.innerHTML = "5:00";
    setTimeout(afterOneCycle, 1000);
    return;
  } else if (
    (timer.tomOneState == true) &
    (timer.tomTwoState == true) &
    (timer.tomThreeState == true) &
    (timer.tomFourState == false)
  ) {
    timer.tomFourState = true;
    tomFour.style.backgroundImage = "url('../assets/img/counterReady.png')";
    timerDisplay.innerHTML = "5:00";
    setTimeout(afterOneCycle, 1000);
    return;
  } else if (
    (timer.tomOneState == true) &
    (timer.tomTwoState == true) &
    (timer.tomThreeState == true) &
    (timer.tomFourState == true)
  ) {
    tomOne.style.backgroundImage = "url('../assets/img/counterWaiting.png')";
    tomTwo.style.backgroundImage = "url('../assets/img/counterWaiting.png')";
    tomThree.style.backgroundImage = "url('../assets/img/counterWaiting.png')";
    tomFour.style.backgroundImage = "url('../assets/img/counterWaiting.png')";
    timerDisplay.innerHTML = "15:00";
    setTimeout(afterFullCycle, 1000);
    return;
  }
}

//Add Work Reset
function resetTimer() {
  timer.topBtnState = 1;
  timer.midBtnState = 0;
  timer.botBtnState = 0;
  timerDisplay.innerHTML = "25:00";
  timer.currTime = 1500;
  timerHolder = setInterval(runTimer, 1000);
  topButton.innerHTML = "Pause";
  spriteMessage.innerHTML = "Pause or take an early break!";
  timer.afterCycle = false;
}

//Run Timer
function runTimer() {
  if (timer.currTime != 0) {
    timer.currTime--;
    timerDisplay.innerHTML =
      parseInt(timer.currTime / 60) +
      ":" +
      ("0" + (timer.currTime % 60)).slice(-2);
  } else {
    clearInterval(timerHolder);
    if ((timer.afterCycle == false) & (timer.afterAllCycle == false)) {
      breakAudio.play();
      tomatoHandler();
    } else if (timer.afterCycle == true) {
      //Code
      spriteMessage.innerHTML = "Back to work!";
      workAudio.play();
      setTimeout(resetTimer, 1000);
    } else if (timer.afterAllCycle == true) {
      spriteMessage.innerHTML = "Good work, reset me if you'd like!";
      workAudio.play();
      timer.topBtnState = 0;
      timer.midBtnState = 0;
      timer.botBtnState = 0;
      timer.afterCycle = false;
      timer.afterAllCycle = false;
      timer.tomOneState = false;
      timer.tomTwoState = false;
      timer.tomThreeState = false;
      timer.tomFourState = false;
    }
  }
}

//Object to pass Timer
var timerHolder = [];

//Top Button Handler
function runStateTop() {
  if (
    (timer.topBtnState == 0) &
    (timer.midBtnState == 0) &
    (timer.botBtnState == 0)
  ) {
    workAudio.play();
    timerHolder = setInterval(runTimer, 1000);
    timer.topBtnState = 1;
    topButton.innerHTML = "Pause";
    spriteMessage.innerHTML = "Pause or take an early break!";
    return;
  }
  if (
    (timer.topBtnState == 1) &
    (timer.midBtnState == 0) &
    (timer.botBtnState == 0)
  ) {
    clearInterval(timerHolder);
    timer.topBtnState = 2;
    topButton.innerHTML = "Resume";
    spriteMessage.innerHTML = "Resume or take an early break!";
    return;
  }
  if (
    (timer.topBtnState == 2) &
    (timer.midBtnState == 0) &
    (timer.botBtnState == 0)
  ) {
    clearInterval(timerHolder);
    timerHolder = setInterval(runTimer, 1000);
    timer.topBtnState = 1;
    topButton.innerHTML = "Pause";
    spriteMessage.innerHTML = "Pause or take an early break!";
    return;
  }
  if ((timer.topBtnState == 1) & (timer.midBtnState == 1)) {
    clearInterval(timerHolder);
    topButton.innerHTML = "Resume";
    spriteMessage.innerHTML = "Resume the break or skip it!";
    timer.topBtnState = 2;
    return;
  }
  if ((timer.topBtnState == 2) & (timer.midBtnState == 1)) {
    topButton.innerHTML = "Pause";
    clearInterval(timerHolder);
    timerHolder = setInterval(runTimer, 1000);
    spriteMessage.innerHTML = "Pause the break or skip it!";
    timer.topBtnState = 1;
    return;
  }
  if ((timer.topBtnState == 1) & (timer.botBtnState == 1)) {
    clearInterval(timerHolder);
    topButton.innerHTML = "Resume";
    spriteMessage.innerHTML = "Resume the break or skip it!";
    timer.topBtnState = 2;
    return;
  }
  if ((timer.topBtnState == 2) & (timer.botBtnState == 1)) {
    topButton.innerHTML = "Pause";
    clearInterval(timerHolder);
    timerHolder = setInterval(runTimer, 1000);
    spriteMessage.innerHTML = "Pause the break or skip it!";
    timer.topBtnState = 1;
    return;
  }
}

//Middle Button Handler
function runStateMid() {
  if (
    (timer.topBtnState == 0) &
    (timer.midBtnState == 0) &
    (timer.botBtnState == 0)
  ) {
    spriteMessage.innerHTML = "You can have a break after you start!";
    return;
  }
  if (
    (timer.topBtnState == 1 || timer.topBtnState == 2) &
    (timer.midBtnState == 0) &
    (timer.botBtnState == 0)
  ) {
    spriteMessage.innerHTML = "Alright, let's have an early break!";
    timer.topBtnState = 1;
    timer.midBtnState = 1;
    midButton.innerHTML = "Skip";
    topButton.innerHTML = "Pause";
    clearInterval(timerHolder);
    timer.currTime = 300;
    timerHolder = setInterval(runTimer, 1000);
    return;
  }
  if (
    (timer.topBtnState == 1 || timer.topBtnState == 2) &
    (timer.midBtnState == 1)
  ) {
    spriteMessage.innerHTML = "Back to work! Pause or take a break any time!";
    timer.midBtnState = 0;
    timer.topBtnState = 1;
    topButton.innerHTML = "Pause";
    midButton.innerHTML = "Break";
    clearInterval(timerHolder);
    timer.currTime = 1500;
    timerHolder = setInterval(runTimer, 1000);
    return;
  }
  if ((timer.botBtnState == 1) & (timer.midBtnState == 0)) {
    spriteMessage.innerHTML = "You're already on a long break!";
    return;
  }
}

//Bottom Button Handler
function runStateBot() {
  if (
    (timer.topBtnState == 0) &
    (timer.midBtnState == 0) &
    (timer.botBtnState == 0)
  ) {
    spriteMessage.innerHTML = "You can have a break after you start!";
    return;
  }
  if (
    (timer.topBtnState == 1 || timer.topBtnState == 2) &
    (timer.midBtnState == 0) &
    (timer.botBtnState == 0)
  ) {
    spriteMessage.innerHTML = "Cool, let's jump to a long break!";
    timer.topBtnState = 1;
    timer.botBtnState = 1;
    botButton.innerHTML = "Skip";
    topButton.innerHTML = "Pause";
    clearInterval(timerHolder);
    timer.currTime = 900;
    timerHolder = setInterval(runTimer, 1000);
    return;
  }
  if (
    (timer.topBtnState == 1 || timer.topBtnState == 2) &
    (timer.botBtnState == 1)
  ) {
    spriteMessage.innerHTML = "Back to work! Pause or take a break any time!";
    timer.botBtnState = 0;
    timer.topBtnState = 1;
    topButton.innerHTML = "Pause";
    botButton.innerHTML = "Long Break";
    clearInterval(timerHolder);
    timer.currTime = 1500;
    timerHolder = setInterval(runTimer, 1000);
    return;
  }
  if (
    (timer.topBtnState == 1 || timer.topBtnState == 2) &
    (timer.midBtnState == 1) &
    (timer.botBtnState == 0)
  ) {
    spriteMessage.innerHTML = "Cool, let's extend to a long break!";
    timer.botBtnState = 1;
    timer.midBtnState = 0;
    timer.topBtnState = 1;
    botButton.innerHTML = "Skip";
    topButton.innerHTML = "Pause";
    midButton.innerHTML = "Break";
    clearInterval(timerHolder);
    timer.currTime = 900;
    timerHolder = setInterval(runTimer, 1000);
  }
}