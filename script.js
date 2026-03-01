let gameSequence = [];
let userSequence = [];

let level = 0;
let started = false;

let colors = ["red", "blue", "green", "yellow"];

document.addEventListener("keypress", function () {
    if (started === false) {
        levelUp();
        started = true;
    }
});

function flashButton(button) {
    button.classList.add("flash");
    setTimeout(function () {
        button.classList.remove("flash");
    }, 250);
}

function levelUp() {
    userSequence = [];
    level++;
    let h2 = document.querySelector("h2");
    h2.innerText = `Level ${level}`;
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = colors[randomIdx];
    let button = document.getElementById(randomColor);
    gameSequence.push(randomColor);
    console.log(`gameSequence: ${gameSequence}`);
    flashButton(button);
}

function userPressButton() {
    flashButton(this);
    let usercolor = this.id;
    userSequence.push(usercolor);
    checkUserSequence();
}

function checkUserSequence() {
    let idx = userSequence.length - 1;
    if (userSequence[idx] === gameSequence[idx]) {
        if (userSequence.length === gameSequence.length) {
            setTimeout(levelUp, 250);
        }
    } else {
        let h2 = document.querySelector("h2");
        h2.innerHTML = "Game Over, Your Score is " + (level - 1) + ". <br> Press Any Key to Restart";
        let body = document.querySelector("body");
        body.style.backgroundColor = "red";
        setTimeout(function () {
            body.style.backgroundColor = "white";
        }, 100);

        gameSequence = [];
        userSequence = [];
        level = 0;
        started = false;
    }
}

let btns = document.querySelectorAll(".color-button");
for (btn of btns) {
    btn.addEventListener("click", userPressButton);
}