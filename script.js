// Player constructor
function Player(name, symbol) {
  this.name = name;
  this.symbol = symbol;
}

// Gameboard object
const Gameboard = {
  board: Array(9).fill(null),

  // Method to reset the board
  resetBoard: function () {
      this.board = Array(9).fill(null);
  },

  // Method to check if the board is full
  isBoardFull: function () {
      return this.board.every(cell => cell !== null);
  }
};

// Game object
const Game = {
  players: [new Player("Player 1", "X"), new Player("Player 2", "O")],
  currentPlayer: null,
  gameOver: false,

  // Method to switch players
  switchPlayer: function () {
      this.currentPlayer = (this.currentPlayer === this.players[0]) ? this.players[1] : this.players[0];
  },

  // Method to check for a win
  checkWin: function () {
      const winConditions = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
          [0, 4, 8], [2, 4, 6]             // Diagonals
      ];

      return winConditions.some(condition => {
          const [a, b, c] = condition;
          return (Gameboard.board[a] === this.currentPlayer.symbol &&
              Gameboard.board[b] === this.currentPlayer.symbol &&
              Gameboard.board[c] === this.currentPlayer.symbol);
      });
  },

  // Method to handle a move
  makeMove: function (index) {
      if (!this.gameOver && Gameboard.board[index] === null) {
          Gameboard.board[index] = this.currentPlayer.symbol;
          if (this.checkWin()) {
              displayMessage(`${this.currentPlayer.name} wins!`);
              this.gameOver = true;
          } else if (Gameboard.isBoardFull()) {
              displayMessage("It's a draw!");
              this.gameOver = true;
          } else {
              this.switchPlayer();
          }
          updateBoard();
      }
  },

  // Method to start the game
  startGame: function () {
      this.currentPlayer = this.players[0];
      this.gameOver = false;
      Gameboard.resetBoard();
      updateBoard();
  }
};

// Function to update the board display
function updateBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
      cell.textContent = Gameboard.board[index] || '';
      cell.onclick = () => Game.makeMove(index);
  });
}

// Function to display a message
function displayMessage(message) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = message;
}

// Function to reset the game
function resetGame() {
  Game.startGame();
  displayMessage('');
}

// Start the game initially
Game.startGame();
