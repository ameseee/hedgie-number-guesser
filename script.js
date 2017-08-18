var currentRange = document.getElementById('current-range');
var feedback = document.getElementById('feedback-text');
var guessBtn = document.getElementById('guess-btn');
var lastGuessText = document.getElementById('last-guess-text');
var newMin;
var newMax;
var nextLevelBtn = document.getElementById('next-level-btn');
var numDisplayed = document.getElementById('pink-number');
var randomNum;
var readyToPlay = document.getElementById('ready-to-play');
var startOver = document.getElementById('start-over');
var submitRangeBtn = document.getElementById('submit-range-btn');
var userInput = document.getElementById('user-input');
var userMax = document.getElementById('user-max');
var userMin = document.getElementById('user-min');
var hedgieLeft = document.getElementById('hedgie-left');
var hedgieRight = document.getElementById('hedgie-right');

//FUNCTIONS
function clearInputField() {
  userInput.value = '';
}

function clickStartOver() {
  window.location.reload();
  window.scrollTo(0, 0);
}

function compare(userNum, randomNum) {
  if (userNum === randomNum) {
    feedback.innerHTML = 'is CORRECT!';
    nextLevelBtn.classList.add('change-to-pink');
    hedgieLeft.style.display = 'inline-block';
    hedgieRight.style.display = 'inline-block';
    document.getElementById('next-level-btn').removeAttribute('disabled');
  } else if (userNum < randomNum) {
    feedback.innerHTML = 'is too low';
  } else if (userNum > randomNum) {
    feedback.innerHTML = 'is too high!';
  } else {
    lastGuessText.innerHTML = '';
    feedback.innerHTML = '...you must enter a number!';
    numDisplayed.innerHTML = 'oopsies...';
  }
}

function disablePlayBtn() {
  readyToPlay.setAttribute('disabled', true);
}

function disableStepOne() {
  submitRangeBtn.setAttribute('disabled', true);
  userMin.disabled = true;
  userMax.disabled = true;
}

function displayInputInPink() {
  var userNum = parseInt(userInput.value);
  printPinkNum(userNum);
  compare(userNum, randomNum);
  //outOfRange(userNum);
  userInput.focus();
}

function enableStartOverBtn() {
  startOver.removeAttribute('disabled');
}

function generateRandomNum(newMin, newMax) {
  randomNum = Math.floor(Math.random() * (newMax - newMin + 1) + newMin);
  console.log(randomNum);
}

function guessBtnOn() {
  if (userInput.value === '') {
    guessBtn.disabled = true;
  } else {
    guessBtn.disabled = false;
  }
}

function minMaxEval() {
  if (newMin > newMax || newMin === newMax) {
    document.getElementById('min-max-error').style.display = 'block';
    userMin.value = 0;
    userMax.value = 100;
  } else {
    document.getElementById('min').innerHTML = newMin;
    document.getElementById('max').innerHTML = newMax;
    document.getElementById('step-2').style.display = 'block';
    document.getElementById('min-max-error').style.display = 'none';
  }
}

function nextLevel() {
  newMin = newMin - 10;
  newMax = newMax + 10;
  feedback.innerHTML = 'Start guessing again!';
  document.getElementById('next-level-btn').setAttribute('disabled', true);
  guessBtn.setAttribute('disabled', true);
  generateRandomNum(newMin, newMax);
  currentRange.innerHTML = 'Range: ' + newMin + ' to ' + newMax;
  numDisplayed.innerHTML = newMin + ' to ' + newMax;
  numDisplayed.classList.add('display-range-pink');
  lastGuessText.innerHTML = 'Your new range is:';
  hedgieLeft.style.display = 'none';
  hedgieRight.style.display = 'none';
  userInput.focus();
}


function openStepThree()  {
  generateRandomNum(newMin, newMax);
  document.getElementById('step-3').style.visibility = 'visible';
  currentRange.innerHTML = 'Range: ' + newMin + ' to ' + newMax;
}

document.querySelector('click', function (userNum) {
  if (userNum > newMax || userNum < newMin) {
    lastGuessText.innerHTML = '';
    feedback.innerHTML = 'The range is ' + newMin + ' to ' + newMax;
    numDisplayed.innerHTML = ': (';
  } else if (userNum >= newMin && userNum <= newMax) {
    lastGuessText. innerHTML = 'Your last guess of:';
  }
});

function printPinkNum(userNum) {
  numDisplayed.innerHTML = userNum;
}

function storeMinMax() {
  newMin = parseInt(userMin.value);
  newMax = parseInt(userMax.value);
  minMaxEval();
}

//EVENT LISTENERS
guessBtn.addEventListener('click', function () {
  displayInputInPink();
  clearInputField();
  guessBtnOn();
  enableStartOverBtn();
});

nextLevelBtn.addEventListener('click', nextLevel);

readyToPlay.addEventListener('click', function () {
  disableStepOne();
  disablePlayBtn();
  openStepThree();
});

startOver.addEventListener('click', clickStartOver);

submitRangeBtn.addEventListener('click', function (e) {
  e.preventDefault();
  storeMinMax();
});

userInput.addEventListener('keyup', guessBtnOn);
