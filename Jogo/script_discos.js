let pagina_discos = document.getElementById('pagina_discos');

// audios e discos
let tub_disco_audio = document.getElementById('tub_disco');
let paranoid_disco_audio = document.getElementById('paranoid_disco');
let master_disco_audio = document.getElementById('master_disco');

let tub_disco = document.getElementById('vinyl_tub');
let paranoid_disco = document.getElementById('vinyl_paranoid');
let master_disco = document.getElementById('vinyl_master');

let discos = document.querySelectorAll('.vinyl');

// jogo
let game = document.getElementById('game');
let pontuacao = document.getElementById('pontuacao');

const selectMusica = new Audio('../sons/seleciona msc.mp3');

window.addEventListener('load', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.classList.add('visible');
    });
});

function changeToGame(level) {
    window.location.href = `jogo.html?level=${level}`;
}

// musica ao passar o mouse
tub_disco.addEventListener('mouseover', () => {
    tub_disco_audio.play();
});
tub_disco.addEventListener('mouseout', () => {
    tub_disco_audio.pause();
});

paranoid_disco.addEventListener('mouseover', () => {
    paranoid_disco_audio.play();
});
paranoid_disco.addEventListener('mouseout', () => {
    paranoid_disco_audio.pause();
});

master_disco.addEventListener('mouseover', function() {
    master_disco_audio.play();
});
master_disco.addEventListener('mouseout', function() {
    master_disco_audio.pause();
});

// ir para o jogo
tub_disco.addEventListener('click', function() {
    selectMusica.play();
    setTimeout(() => changeToGame(1), 1400);
});
paranoid_disco.addEventListener('click', function() {
    selectMusica.play();
    setTimeout(() => changeToGame(2), 1400);
});
master_disco.addEventListener('click', function() {
    selectMusica.play();
    setTimeout(() => changeToGame(3), 1400);
});





