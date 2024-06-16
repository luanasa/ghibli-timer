const watchDocument = document.querySelector("#watch");
let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;

function init() {
    clearInterval(interval); // Limpa qualquer intervalo anterior para evitar múltiplas contagens simultâneas
    interval = setInterval(watch, 1000);
}

const pause = () => {
    clearInterval(interval); // Pausa o intervalo atual
}

const stop = () => {
    clearInterval(interval); // Limpa o intervalo atual
    watchDocument.innerHTML = "00:00:00"; // Zera o contador
    seconds = 0;
    minutes = 0;
    hours = 0;
}

const digitZero = (digit) => {
    if (digit < 10) {
        return "0" + digit;
    } else {
        return digit;
    }
}

function watch() {
    seconds++;
    
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }

    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    watchDocument.innerHTML = digitZero(hours) + ":" + digitZero(minutes) + ":" + digitZero(seconds);
}
