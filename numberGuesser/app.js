

// game values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// assign UI min and max

minNum.textContent = min;
maxNum.textContent = max;

// play again listener

game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});

// listen for guess

guessBtn.addEventListener('click', function() {

    let guess = parseInt(guessInput.value);

    // validate
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // check if winning number
    if(guess === winningNum) {
        // game over - WON
        gameOver(true, `${winningNum} is correct, YOU WIN!`);

    } else {
            // wrong number 
            guessesLeft -= 1;

        if(guessesLeft === 0) {
            // GAME OVER
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
        } else {
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
            guessInput.style.borderColor = 'red';
            // clear input
            guessInput.value = '';
        }
    }
});

// game over

function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color === 'red';

    //disable input
    guessInput.disabled = true;
    // winning colors
    guessInput.style.borderColor = color;
    message.style.color = color;
    // UI message of win
    setMessage(msg);


    // play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// random winning number
function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

// set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}