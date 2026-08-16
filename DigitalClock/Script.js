const timetext = document.getElementById("time");
const dateText = document.getElementById("date");

function updateClock(){
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    timetext.textContent =
    hours + ":" + minutes + ":" + seconds;

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    dateText.textContent =
    year + "." + month + "." + day;
}

updateClock();
setInterval(updateClock, 1000);