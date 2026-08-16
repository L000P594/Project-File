const timetext = document.getElementById("time");

function updateClock(){
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    timetext.textContent =
    hours + ":" + minutes + ":" + seconds;
}

updateClock();
setInterval(updateClock)