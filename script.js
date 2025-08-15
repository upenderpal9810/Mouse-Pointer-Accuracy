let timer = 60;
let score = 0;
let hitNumber = 0;
let timerInterval;
let bubbleCount = 100;

const startGame = () => {
    score = 0;
    timer = 60;
    document.querySelector('#scores').textContent = score;
    document.querySelector('#timer').textContent = timer;

    // Get selected difficulty
    const difficulty = document.querySelector('#difficulty').value;

    // Set bubble count based on difficulty
    switch (difficulty) {
        case 'easy':
            bubbleCount = 50;
            break;
        case 'medium':
            bubbleCount = 100;
            break;
        case 'hard':
            bubbleCount = 150;
            break;
    }

    generateHitNumber();
    createBubbles();
    startTimer();
};

const generateHitNumber = () => {
    hitNumber = Math.floor(Math.random() * 10);
    document.querySelector('#hitval').textContent = hitNumber;
};

const createBubbles = () => {
    const bubbleContainer = document.querySelector('#pbtm');
    bubbleContainer.innerHTML = '';
    for (let i = 1; i <= bubbleCount; i++) {
        const randomNum = Math.floor(Math.random() * 10);
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.textContent = randomNum;
        bubble.addEventListener('click', () => checkHit(randomNum));
        bubbleContainer.appendChild(bubble);
    }
};

const startTimer = () => {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.querySelector('#timer').textContent = timer;
        } else {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
};

const checkHit = (clickedNum) => {
    if (clickedNum === hitNumber) {
        score += 10;
        document.querySelector('#scores').textContent = score;
        generateHitNumber();
        createBubbles();
    }
};

const endGame = () => {
    document.querySelector('#pbtm').innerHTML = `<h1 style="color: white;">Game Over! Your Score: ${score}</h1>`;
};

document.querySelector('#start-btn').addEventListener('click', startGame);
