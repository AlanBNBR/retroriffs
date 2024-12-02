const inicio = document.getElementById('inicio');
const continuar = new Audio('../sons/continuar.mp3');

inicio.addEventListener('click', function() {
    continuar.play();
    setTimeout(() => window.location.href = 'manual.html', 400);
});