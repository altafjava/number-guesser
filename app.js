let min = 1,
  max = 10,
  winningNum = getRandomNumber(),
  guessesLeft = 3;

const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);
  // VALIDATION
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  // CHECK IF WON
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is Correct, YOU WIN!`);
  } else {
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      gameOver(false, `!!! GAME OVER !!! You lost. The correct number was ${winningNum}`);
    } else {
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}

function gameOver(won, msg) {
  guessInput.disabled = true;
  let color = won ? 'green' : 'red';
  guessInput.style.borderColor = color;
  setMessage(msg, color);
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}
function getRandomNumber() {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
