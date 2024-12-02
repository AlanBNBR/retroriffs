let botao_menu = document.getElementById('botao_menu');
let pagina_menu = document.getElementById('pagina_menu');
let background = document.getElementById('background');

const continuar_som = new Audio('sons/continuar.mp3');

function transitionToDiscos() {
    background.classList.add('zoom');
    setTimeout(() => {
        window.location.href = 'Jogo/discos.html';
    }, 2000);
}

botao_menu.addEventListener('click', function () {
    continuar_som.play();
    pagina_menu.classList.add('hidden');
    setTimeout(transitionToDiscos, 400);
});
