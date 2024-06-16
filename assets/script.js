const watchDocument = document.querySelector("#watch");
let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;

function init() { //Botão Início
    clearInterval(interval); // Limpa qualquer intervalo anterior para evitar múltiplas contagens simultâneas
    interval = setInterval(watch, 1000);
    playClickSound(); // Adiciona som ao iniciar
}

function pause() { // Botão Pausar
    clearInterval(interval); // Pausa o intervalo atual
    playClickSound(); // Adiciona som ao pausar
}

function stop() { // Botão Zerar
    clearInterval(interval); // Limpa o intervalo atual
    watchDocument.innerHTML = "00:00:00"; // Zera o contador
    seconds = 0;
    minutes = 0;
    hours = 0;
    playClickSound(); // Adiciona som ao zerar
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

const clickSound = new Audio('./assets/click-sound.mp3');

function playClickSound() {
    clickSound.currentTime = 0; // Reinicia o áudio se já estiver tocando
    clickSound.play();
}

// Função para adicionar o som ao clicar nos botões
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', playClickSound);
});
