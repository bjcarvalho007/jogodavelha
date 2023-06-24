// Selecionando os elementos HTML
const squares = document.querySelectorAll('.square');
const messageElement = document.querySelector('#message');
const resetButton = document.querySelector('#reset');

// Variáveis do jogo
let currentPlayer = 'x';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Sequências de vitória
const winningSequences = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Função para reiniciar o jogo
function resetGame() {
    currentPlayer = 'x';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    messageElement.textContent = '';
    squares.forEach(square => square.classList.remove('x', 'o'));
}

// Função para manipular a jogada do jogador
function handleMove(square, index) {
    // Verifica se a jogada é válida
    if (gameState[index] !== '' || !gameActive) return;

    // Atualiza a marcação no tabuleiro e no estado do jogo
    square.classList.add(currentPlayer);
    gameState[index] = currentPlayer;

    // Verifica se houve vencedor ou empate
    checkWin();
    checkDraw();

    // Alterna o jogador atual
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}

// Função para verificar se o jogo foi vencido
function checkWin() {
    for (const sequence of winningSequences) {
        const [a, b, c] = sequence;
        if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            messageElement.textContent = `${currentPlayer.toUpperCase()} ganhou!`;
            gameActive = false;
            return;
        }
    }
}

// Função para verificar se houve empate
function checkDraw() {
    if (gameState.every(value => value !== '')) {
        messageElement.textContent = 'Empate!';
        gameActive = false;
    }
}

// Adicionando os eventos de clique nos quadrados e no botão de reiniciar
squares.forEach((square, index) => square.addEventListener('click', () => handleMove(square, index)));
resetButton.addEventListener('click', resetGame);
