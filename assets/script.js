const watchDocument = document.querySelector("#watch");
let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;

function init() { //Botão Inicio
    watch();
    interval = setInterval(watch, 1000);
}

const pause = () => { // Botão Pausar
    clearInterval(interval); // para o intervalo e com isso pausa a contagem
}

const stop = () => { // Botão Zerar
    watchDocument.innerHTML = "00:00:00"; //zerar tudo
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