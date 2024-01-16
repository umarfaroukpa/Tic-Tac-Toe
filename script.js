// Gameboard Factory
const createGameboard = () => {
      const board = ['', '', '', '', '', '', '', '', ''];

      const checkWinner = () => {
        // Add logic to check for a winner
      };

      const checkTie = () => {
        // Add logic to check for a tie
      };

      return {
        board,
        checkWinner,
        checkTie,
      };
    };

    // Player Factory
const createPlayer = (name, marker) => {
      return {
        name,
        marker,
      };
    };

    // Game Controller
const gameController = (() => {
      let currentPlayer;
      let gameActive = false;

      const gameboard = createGameboard();
      const player1 = createPlayer(document.getElementById('player1').value, 'X');
      const player2 = createPlayer(document.getElementById('player2').value, 'O');

      const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
      };

      const handleCellClick = (index) => {
        if (gameboard.board[index] === '' && gameActive) {
          gameboard.board[index] = currentPlayer.marker;
          // Add logic to update the display and check for a winner/tie
          switchPlayer();
        }
      };


    const startGame = () => {
        currentPlayer = player1;
        gameActive = true;
        gameboard.resetBoard();
        displayController.renderBoard();
        // Initialize the display and other necessary setup
      };

      return {
        handleCellClick,
        startGame,
      };
})();

    // Display Controller
    const displayController = (() => {
      const gameBoardElement = document.getElementById('gameBoard');
      const gameResultElement = document.getElementById('gameResult');


      const renderBoard = () => {
        gameBoardElement.innerHTML = '';
        gameController.gameboard.board.forEach((cell, index) => {
          const cellElement = document.createElement('div');
          cellElement.classList.add('cell');
          cellElement.textContent = cell;
          cellElement.addEventListener('click', () => gameController.handleCellClick(index));
          gameBoardElement.appendChild(cellElement);
        });
      };

      // Additional functions to update the display as the game progresses

      return {
        renderBoard,
        // Add other display-related functions here
      };
})();

    // Initial setup
    // Add event listeners, initialize the display, etc.

