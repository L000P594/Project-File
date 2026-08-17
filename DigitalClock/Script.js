const timeText = document.getElementById("time");
const dateText = document.getElementById("date");

const menuButtons = document.querySelectorAll(".sidebar button");

const clock = document.querySelector(".clock");
const stopwatch = document.querySelector(".stopwatch");


// 시계
function updateClock() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    timeText.textContent =
        hours + ":" + minutes + ":" + seconds;

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    dateText.textContent =
        year + ". " + month + ". " + day;
}


// 메뉴
menuButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        menuButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        // Clock
        if (button.textContent === "Clock") {
            clock.style.display = "block";
            stopwatch.style.display = "none";
        }


        // Stopwatch
        if (button.textContent === "Stopwatch") {
            clock.style.display = "none";
            stopwatch.style.display = "block";
        }

    });

});

const stopwatchTimeText = document.getElementById("stopwatchTime");
const startStopwatch = document.getElementById("startStopwatch");
const resetStopwatch = document.getElementById("resetStopwatch");

let stopwatchInterval = null;
let stopwatchRunning = false;

let startTime = 0;
let elapsedTime = 0;


function updateStopwatch() {
    const currentTime = Date.now();

    const totalTime = elapsedTime + (currentTime - startTime);

    const hours = Math.floor(totalTime / 3600000);
    const minutes = Math.floor((totalTime % 3600000) / 60000);
    const seconds = Math.floor((totalTime % 60000) / 1000);
    const milliseconds = Math.floor((totalTime % 1000) / 10);

    stopwatchTimeText.textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(2, "0");
}


startStopwatch.addEventListener("click", function() {

    if (!stopwatchRunning) {

        stopwatchRunning = true;
        startStopwatch.textContent = "STOP";

        startTime = Date.now();

        stopwatchInterval = setInterval(updateStopwatch, 10);

    } else {

        stopwatchRunning = false;
        startStopwatch.textContent = "START";

        elapsedTime += Date.now() - startTime;

        clearInterval(stopwatchInterval);
    }

});


resetStopwatch.addEventListener("click", function() {

    clearInterval(stopwatchInterval);

    stopwatchRunning = false;

    startTime = 0;
    elapsedTime = 0;

    stopwatchTimeText.textContent = "00:00:00.00";

    startStopwatch.textContent = "START";
});

// 시계 실행
updateClock();

setInterval(updateClock, 1000);