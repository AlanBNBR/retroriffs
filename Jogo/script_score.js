document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const pontuacao = params.get('pontuacao');
    const nivel = parseInt(params.get('level'), 10) || 1; // Converte `level` para número ou usa 1 como padrão
    const ganhou = params.get('ganhou');

    const next_again = document.getElementById('Next_again');
    const botao_inicio = document.getElementById('Inicio');

    const pontuacaoElem = document.getElementById('pontuacao');
    const mensagemFinalElem = document.getElementById('mensagemFinal');
    const mensagemElem = document.getElementById('mensagem');

    const risada = new Audio('../sons/erro_grande.mp3');
    const palmas = new Audio('../sons/palmas.mp3');
    const continuar = new Audio('../sons/continuar.mp3');

    // Verifica se os elementos existem antes de tentar definir o textContent
    if (pontuacaoElem) {
        pontuacaoElem.textContent = `Sua pontuação: ${pontuacao}`;
    }

    if (mensagemFinalElem && mensagemElem) {
        if (ganhou === 'true') {
            mensagemFinalElem.textContent = 'Parabéns! Você ganhou!';
            mensagemElem.textContent = 'Nível Concluído';
            next_again.textContent = 'Próximo Nível';
            if (nivel === 3 && ganhou === 'true'){
                next_again.textContent = 'Créditos';
            }
        } else {
            mensagemFinalElem.textContent = 'Você não é um Rockstar!';
            next_again.textContent = 'Jogar Novamente';
        }
    }

    if (botao_inicio) {
        botao_inicio.addEventListener('click', function() {
            continuar.play();
            setTimeout(() => window.location.href = 'discos.html', 400);
        });
    }

    if (next_again) {
        next_again.addEventListener('click', function() {
            continuar.play();
            setTimeout(() => handleNextStep(nivel,ganhou), 400);
        });
    }
    function handleNextStep(nivel, ganhou) {
        if (nivel === 3 && ganhou === 'true') {
            window.location.href = `creditos.html`;
        } else if (ganhou === 'true') {
            window.location.href = `jogo.html?level=${nivel + 1}`;
        } else {
            window.location.href = `jogo.html?level=${nivel}`;
        }
    }
});
