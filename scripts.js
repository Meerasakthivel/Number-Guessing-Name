let secretNumber;
let attempts = 0;
let maxAttempts = 7;
let minNumber = 1;
let maxNumber = 100;
let guessHistory = [];

const guessInput = document.getElementById("guessInput");
const feedbackEl = document.getElementById("feedback");
const attemptsEl = document.getElementById("attempts");
const maxAttemptsEl = document.getElementById("maxAttempts");
const historyList = document.getElementById("historyList");
const proximityMeter = document.getElementById("proximityMeter");
const rangeText = document.getElementById("rangeText");
const difficultySelect = document.getElementById("difficulty");

function setDifficulty() {
  const difficulty = difficultySelect.value;
  if (difficulty === "easy") {
    minNumber = 1;
    maxNumber = 50;
    maxAttempts = 10;
  } else if (difficulty === "medium") {
    minNumber = 1;
    maxNumber = 100;
    maxAttempts = 7;
  } else {
    minNumber = 1;
    maxNumber = 200;
    maxAttempts = 5;
  }
  resetGame();
  rangeText.innerHTML = `Guess a number between <strong>${minNumber} and ${maxNumber}</strong>`;
  maxAttemptsEl.textContent = maxAttempts;
}

function generateNumber() {
  secretNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}

function getEmojiFeedback(diff) {
  if (diff === 0) return "🎉 Perfect!";
  if (diff <= 3) return "🔥 You're on fire!";
  if (diff <= 7) return "😊 Getting warmer!";
  if (diff <= 15) return "😐 Getting colder...";
  return "❄️ Ice cold!";
}

function updateProximityMeter(diff) {
  let proximity = Math.max(0, 1 - diff / (maxNumber - minNumber));
  proximityMeter.style.width = (proximity * 100) + "%";
  if (proximity > 0.7) {
    proximityMeter.style.background = "linear-gradient(90deg, #00b894, #55efc4)";
  } else if (proximity > 0.4) {
    proximityMeter.style.background = "linear-gradient(90deg, #fdcb6e, #fab1a0)";
  } else {
    proximityMeter.style.background = "linear-gradient(90deg, #d63031, #e17055)";
  }
}

function addToHistory(guess, emoji) {
  guessHistory.push({guess, emoji});
  historyList.innerHTML = guessHistory.map(
    item => `<li>${item.guess} — ${item.emoji}</li>`
  ).join("");
}

function checkGuess() {
  if (attempts >= maxAttempts) {
    feedbackEl.textContent = `❌ No attempts left! The number was ${secretNumber}.`;
    guessInput.disabled = true;
    return;
  }
  
  const guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess < minNumber || guess > maxNumber) {
    feedbackEl.textContent = `🚫 Enter a valid number between ${minNumber} and ${maxNumber}.`;
    return;
  }

  attempts++;
  attemptsEl.textContent = attempts;

  const diff = Math.abs(secretNumber - guess);
  const emojiFeedback = getEmojiFeedback(diff);
  updateProximityMeter(diff);

  if (diff === 0) {
    feedbackEl.textContent = `🎉 Correct! You guessed it in ${attempts} tries!`;
    guessInput.disabled = true;
  } else if (attempts === maxAttempts) {
    feedbackEl.textContent = `❌ Game over! The number was ${secretNumber}.`;
    guessInput.disabled = true;
  } else {
    feedbackEl.textContent = emojiFeedback;
  }
  
  addToHistory(guess, emojiFeedback);
  guessInput.value = "";
  guessInput.focus();
}

function resetGame() {
  attempts = 0;
  guessHistory = [];
  attemptsEl.textContent = attempts;
  maxAttemptsEl.textContent = maxAttempts;
  guessInput.disabled = false;
  guessInput.value = "";
  feedbackEl.textContent = "";
  historyList.innerHTML = "";
  proximityMeter.style.width = "0%";
  generateNumber();
  guessInput.focus();
}

setDifficulty(); // Initialize the game with default difficulty

// Existing variables here...
const soundCorrect = document.getElementById("soundCorrect");
const soundClose = document.getElementById("soundClose");
const soundFar = document.getElementById("soundFar");
const soundGameOver = document.getElementById("soundGameOver");
const soundReset = document.getElementById("soundReset");

function playSound(type) {
  switch(type) {
    case "correct":
      soundCorrect.play();
      break;
    case "close":
      soundClose.play();
      break;
    case "far":
      soundFar.play();
      break;
    case "gameOver":
      soundGameOver.play();
      break;
    case "reset":
      soundReset.play();
      break;
  }
}

function checkGuess() {
  if (attempts >= maxAttempts) {
    feedbackEl.textContent = `❌ No attempts left! The number was ${secretNumber}.`;
    guessInput.disabled = true;
    playSound("gameOver");
    return;
  }
  
  const guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess < minNumber || guess > maxNumber) {
    feedbackEl.textContent = `🚫 Enter a valid number between ${minNumber} and ${maxNumber}.`;
    return;
  }

  attempts++;
  attemptsEl.textContent = attempts;

  const diff = Math.abs(secretNumber - guess);
  const emojiFeedback = getEmojiFeedback(diff);
  updateProximityMeter(diff);

  if (diff === 0) {
    feedbackEl.textContent = `🎉 Correct! You guessed it in ${attempts} tries!`;
    guessInput.disabled = true;
    playSound("correct");
  } else if (attempts === maxAttempts) {
    feedbackEl.textContent = `❌ Game over! The number was ${secretNumber}.`;
    guessInput.disabled = true;
    playSound("gameOver");
  } else {
    feedbackEl.textContent = emojiFeedback;
    if (diff <= 7) playSound("close");
    else playSound("far");
  }
  
  addToHistory(guess, emojiFeedback);
  guessInput.value = "";
  guessInput.focus();
}

function resetGame() {
  attempts = 0;
  guessHistory = [];
  attemptsEl.textContent = attempts;
  maxAttemptsEl.textContent = maxAttempts;
  guessInput.disabled = false;
  guessInput.value = "";
  feedbackEl.textContent = "";
  historyList.innerHTML = "";
  proximityMeter.style.width = "0%";
  generateNumber();
  guessInput.focus();
  playSound("reset");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
