let hitrandom;
let score = 0;

// 1st function to execute >> instruction page
function startGame() {
    let area = document.querySelector(".pbtm")
    area.innerHTML = `<div class="instructions">
                    <h1>🎮 How to play ?</h1>
                    <p>You have 60 seconds to hit the bubbles. Look at the top of screen and know your target to hit. As you hit your target ,the bubbles will be shuffled . You will get 10 score for each correct hit . Try to hit bubbles as much as you can under 60 seconds to get the maximum score.</p>
                    <button id="start">Start Game</button>
                </div>`
    document.querySelector("#start").addEventListener("click", () => {
        makeBubble()
        getNewHit()
        runTimer(60)
    })
}

//function to increase score on correct hit
function increaseScore() {
    score += 10
    document.querySelector("#scoreval").textContent = score
}

function makeBubble() {
    let clutter = "";
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    // Determine the number of bubbles based on screen width and height
    let numBubbles;

    if (screenWidth <= 480) { // Mobile devices
        numBubbles = screenHeight <= 800 ? 30 : 50;
    } else if (screenWidth <= 768) { // Tablets
        numBubbles = screenHeight <= 1000 ? 70 : 100;
    } else { // Desktops and larger screens
        numBubbles = screenHeight <= 1200 ? 120 : 154;
    }

    // Generate bubbles
    for (let i = 0; i < numBubbles; i++) {
        let random = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble"><p>${random}</p></div>`;
    }
    
    document.querySelector(".pbtm").innerHTML = clutter;
}

//function to display some content when game is over
function gameOver() {
    document.querySelector(".pbtm").innerHTML = `<div class="gameover">
    <h1>Game Over</h1>
    <h1>Total Score : ${score}</h1>
    <div class="btns">
    <button id="restart">Restart</button>
    <button id="home">Home</button>
    </div>
</div>`

    document.querySelector("#restart").addEventListener("click", () => {
        makeBubble()
        getNewHit()
        runTimer(60)
    })
    document.querySelector("#home").addEventListener("click", () => {
        startGame()
    })
}

//function to run timestamp
function runTimer(time) {
    let timer = time
    let timerInt = setInterval(() => {
        if (timer > 0) {
            timer--
            document.querySelector("#timeval").textContent = timer
        } else {
            clearInterval(timerInt)
            gameOver()
        }
    }, 1000);
}

//function to get new random hit target for player
function getNewHit() {
    hitrandom = Math.floor(Math.random() * 10)
    document.querySelector("#hitval").textContent = hitrandom
}

// Gameplay Logic
document.querySelector(".pbtm").addEventListener("click", (e) => {
    let clicked = Number(e.target.textContent)
    if (clicked === hitrandom) {
        increaseScore()
        getNewHit()
        makeBubble()
    }
})

//Function to run the code
startGame()

