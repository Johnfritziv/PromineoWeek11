let ticTacToeGrid = document.getElementById('ticTacToeGrid'); // The actual grid where the game is.
let gameStatus = document.getElementById('gameStatus'); // Tells you whose turn it is, or if the game is ended.
let restartButton = document.getElementById('restartButton'); //Quick restart button to reset the game
let currentPlayer = 'X'; // Starts off as X, switches to O and back on each turn.
let gameActive = true; // Variable to keep track of the game actually being played or when it is over.
let gameState = ['', '', '', '', '', '', '', '', '']; // This is an array that keeps track of each cell, empty, X, or O.

// Array of arrays of each combination of indexes that an X or O can be in at the same time to make a winning state for that player, as referenced by the gameState array.
let winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


let initializeGame = () => {
    ticTacToeGrid.innerHTML = '';
    gameState.fill(''); // When starting or restarting the game, this clears all of the grids via the array fields.
    gameActive = true;

    for (let i = 0; i < 9; i++) { // This makes the 9 cells needed in the grid 
        let cell = document.createElement('div');
        cell.addEventListener('click', () => handleCellClick(i)); // The click function for each cell
        ticTacToeGrid.appendChild(cell);
    }
    updateGameStatus();
};

let handleCellClick = (index) => {
    if (gameState[index] !== '' || !gameActive) {
        return;
    }
    gameState[index] = currentPlayer;
    ticTacToeGrid.children[index].innerText = currentPlayer; // Just takes the current player, i.e. X or O, and assigns that value to the grid that was clicked.
    checkForWinner();
};

let checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) { //This loops through each scenario in the win condition array, if the value of one of those spaces is empty, it continues, if it has something, it'll check that all 3 indexes selected are the same letter. If so, it stops the round as a win.
        let winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if ([a, b, c].includes('')) {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announceWinner(currentPlayer === 'X' ? 'X wins!' : 'O wins!'); // Checks if the player is X when the round is won, announces them as the winner. If the player isn't X, announces O as the winner.
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) { // If all the cells are filled, but there is no winner, declares a draw.
        announceWinner('Draw!');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateGameStatus();
};

let announceWinner = (message) => {
    alert(message);
    initializeGame();
};

let updateGameStatus = () => {
    gameStatus.innerText = `${currentPlayer}'s Turn`;
};

restartButton.addEventListener('click', initializeGame);

initializeGame();
