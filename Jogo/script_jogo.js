const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get('level') || 1;
let score = 0;
let life = 100;
const teclas = ['A', 'S', 'D', 'F'];
let jogoIniciando = false;

const gameArea = document.getElementById('game');
const lifeBar = document.getElementById('life');
const pontuacao = document.getElementById('pontuacao');

// Músicas
let musica_tub = document.getElementById('tub_musica');
let musica_paranoid = document.getElementById('paranoid_musica');
let musica_master = document.getElementById('master_musica');

// sons 
const acerto = document.getElementById('acerto');
const erro = document.getElementById('erro');
const perdeu = document.getElementById('perdeu');
const ganhou = document.getElementById('ganhou');

// dificuldade do jogo
let noteSpeed;
let descentRate;
switch (parseInt(level)) {
    case 1:
        noteSpeed = 700;
        descentRate = 8;
        break;
    case 2:
        noteSpeed = 500;
        descentRate = 10;
        break;
    case 3:
        noteSpeed = 300;
        descentRate = 20;
        break;
    default:
        noteSpeed = 800;
        descentRate = 8;
        break;
}

// iniciar o jogo ao pressionar espaço
document.addEventListener('keydown', (e) => {
    if (e.key === " " && !jogoIniciando) {
        jogoIniciando = true;
        document.getElementById('start-text').style.display = 'none';
        if (level == 1) {
            musica_tub.play();
        } else if (level == 2) {
            musica_paranoid.play();
        } else if (level == 3) {
            musica_master.play();
        }
        startGame();
    }
});

function updateScore() {
    pontuacao.innerText = 'Pontuação: ' + score;
    lifeBar.style.height = life + "%";
}

function startGame() {
    gerarNotas();
}

function finalizarJogo() {
    document.querySelectorAll('.note').forEach((note) => {
        clearInterval(note.moveInterval);
    });
    perdeu.play();

    // Redireciona apenas após o áudio terminar
    perdeu.addEventListener('ended', () => {
        window.location.href = `score.html?pontuacao=${score}&ganhou=false&level=${encodeURIComponent(level)}`;
    });
}

function gerarNotas() {
    const interval = setInterval(() => {
        if (life <= 0) {
            clearInterval(interval);
            finalizarJogo();
            return;
        }

        // Determina se uma ou duas notas serão geradas
        const quantidadeNotas = Math.random() < 0.5 ? 1 : 2; // 50% de chance para 1 ou 2 notas

        for (let i = 0; i < quantidadeNotas; i++) {
            const randomIndex = Math.floor(Math.random() * teclas.length);
            const randomKey = teclas[randomIndex];
            const note = document.createElement('div');
            note.classList.add('note');
            note.dataset.key = randomKey;

            // Define a cor da nota de acordo com a tecla
            if (randomKey === 'A' || randomKey === 'D') {
                note.classList.add('notaR');
            } else if (randomKey === 'S' || randomKey === 'F') {
                note.classList.add('notaA');
            }

            // Posiciona a nota
            note.style.left = (randomIndex * 25) + '%';
            gameArea.appendChild(note);

            let notePosition = 0;
            note.moveInterval = setInterval(() => {
                if (notePosition >= 440) {
                    clearInterval(note.moveInterval);
                    if (note.parentNode === gameArea) {
                        erro.play();
                        gameArea.removeChild(note);
                        life -= 15;
                        updateScore();
                    }
                } else {
                    notePosition += descentRate;
                    note.style.top = notePosition + 'px';
                }
            }, 50);
        }
    }, noteSpeed);
}


// teste se a nota foi apertada
document.addEventListener('keydown', (event) => {
    if (jogoIniciando) {
        const key = event.key.toUpperCase();
        if (teclas.includes(key)) {
            const note = document.querySelector(`.note[data-key="${key}"]`);
            if (note) {
                const noteRect = note.getBoundingClientRect();
                const targetRect = document.querySelector(`.target[data-key="${key}"]`).getBoundingClientRect();

                // verifica se a nota está dentro da zona de acerto
                if (noteRect.top >= targetRect.top - 30 && noteRect.top <= targetRect.top + 30) {
                    acerto.play();
                    score += 100;
                    life = Math.min(100, life + 5);
                    updateScore();
                    clearInterval(note.moveInterval);
                    note.remove(); // remove a nota quando acerta
                } else {
                    erro.play();
                    life -= 10;
                    updateScore();
                }
            } else {
                erro.play();
                life -= 15;
                updateScore();
            }

            if (life <= 0) {
                life = 0;
                finalizarJogo();
            }
        }
    }
});

// fim das musicas e redirecionamento
[musica_tub, musica_paranoid, musica_master].forEach((musica) => {
    ganhou.addEventListener('ended', () => {
        musica.addEventListener("ended", () => {
            window.location.href = `score.html?pontuacao=${score}&ganhou=true&level=${encodeURIComponent(level)}`;
    });
    });
    
});
