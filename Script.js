const timeText = document.getElementById('time');
const scoreText = document.getElementById('score');
const startButton = document.getElementById('startButton');
const cells = document.querySelectorAll('.cell');
const highScoreText = document.getElementById('highScore');
const giveUpButton = document.getElementById('giveUpButton');
const newHighScoreText = document.getElementById('newHighScore');
const resetButton = document.getElementById('resetButton');
const gameOver = document.getElementById('gameOver');
const finalScore = document.getElementById('finalScore');
const closeGameOver = document.getElementById('closeGameOver');
const giveUpPopup = document.getElementById('giveUp');
const confirmGiveUpButton = document.getElementById('confirmGiveUpButton');
const cancelGiveUpButton = document.getElementById('cancelGiveUpButton');

let isPlaying = false;
let moleInterval;
let timerInterval;
let moleSpeed = 1000;
let time = 30;
let score = 0;
let highScore = Number(localStorage.getItem('highScore')) || 0;

giveUpButton.style.display = 'none';
giveUpPopup.style.display = 'none';

gameOver.style.display = 'none';

if (highScoreText) {
    highScoreText.textContent = highScore;
}

const mole = document.createElement('div');
mole.classList.add('mole');
mole.style.display = 'none';

closeGameOver.addEventListener('click', function() {
    gameOver.style.display = 'none';
});

function createMole() {
    const randomIndex = Math.floor(Math.random() * cells.length);
    mole.remove();
    cells[randomIndex].appendChild(mole);
    mole.style.display = 'block';
}

function startMoleLoop() {
    clearInterval(moleInterval);
    moleInterval = setInterval(function() {
        createMole();
    }, moleSpeed);
}

function endGame() {
    clearInterval(moleInterval);
    clearInterval(timerInterval);

    mole.style.display = 'none';

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreText.textContent = highScore;
        newHighScoreText.style.display = 'block';
        setTimeout(function() {
            newHighScoreText.style.display = 'none';
        }, 5000);
    }

    isPlaying = false;
    startButton.disabled = false;
    giveUpButton.style.display = 'none';
    giveUpPopup.style.display = 'none';
    finalScore.textContent = score;
    gameOver.style.display = 'block';
}

mole.addEventListener('click', function() {
    if (!isPlaying) {
        return;
    }

    score++;
    scoreText.textContent = score;

    if (score >= 10) {
        moleSpeed = 500;
    } else if (score >= 5) {
        moleSpeed = 800;
    } else {
        moleSpeed = 1000;
    }

    startMoleLoop();
    createMole();
});

startButton.addEventListener('click', function() {
    newHighScoreText.style.display = 'none';
    if (isPlaying) {
        return;
    }

    isPlaying = true;
    time = 30;
    score = 0;
    moleSpeed = 1000;

    timeText.textContent = time;
    scoreText.textContent = score;
    giveUpButton.style.display = 'inline-block';

    startButton.disabled = true;
    createMole();
    startMoleLoop();

    clearInterval(timerInterval);
    timerInterval = setInterval(function() {
        time--;
        timeText.textContent = time;

        if (time <= 0) {
            endGame();
        }
    }, 1000);
});

giveUpButton.addEventListener('click', function() {
    if (!isPlaying) {
        return;
    }
    giveUpPopup.style.display = 'flex';
});

resetButton.addEventListener('click', function() {
    const answer = confirm('Are you sure you want to reset the high score?');
    if (answer) {
        localStorage.removeItem('highScore');
        highScore = 0;
        highScoreText.textContent = highScore;
    }
});

confirmGiveUpButton.addEventListener('click', function() {
    if (!isPlaying) {
        return;
    }
    giveUpPopup.style.display = 'none';
    endGame();
});

cancelGiveUpButton.addEventListener('click', function() {
    giveUpPopup.style.display = 'none';
});