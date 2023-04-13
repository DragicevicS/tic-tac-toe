const gameBoard = (() => { // setting up the board and it's functions
  const board = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
  ];
  const printBoard = () => console.table(board);
  const getBoard = () => board;
  return { getBoard, printBoard };
})();

const players = (() => { // defining players and their functions
  const player = [
    {
      name: 'p1',
      playerSymbol: 'X'
    },
    {
      name: 'p2',
      playerSymbol: 'O'
    },
    {
      name: 'ai',
      playerSymbol: null
    }
  ];
  let activePlayer = player[0];
  const switchPlayer = () => {
    activePlayer = activePlayer === player[0] ? player[1] : player[0];
  };
  const getActivePlayer = () => activePlayer;
  return { switchPlayer, getActivePlayer }
})();

const gameFlow = () => { // game factory function
  const board = gameBoard.getBoard();

  gameBoard.printBoard();
  console.log(`${players.getActivePlayer().name}'s turn`);

  function checkResult(boardState, currentPlayer){
    let bs = boardState;
    let cps = currentPlayer.playerSymbol;
    if (bs[0][0] == cps && bs[1][1] == cps && bs[2][2] == cps) return true;
    if (bs[0][2] == cps && bs[1][1] == cps && bs[2][0] == cps) return true;
    if (bs[0][0] == cps && bs[1][0] == cps && bs[2][0] == cps) return true;
    if (bs[0][1] == cps && bs[1][1] == cps && bs[0][2] == cps) return true;
    if (bs[0][2] == cps && bs[1][2] == cps && bs[2][2] == cps) return true;
    if (bs[0][0] == cps && bs[0][1] == cps && bs[0][2] == cps) return true;
    if (bs[1][0] == cps && bs[1][1] == cps && bs[1][2] == cps) return true;
    if (bs[2][0] == cps && bs[2][1] == cps && bs[2][2] == cps) return true;
  };

  const makeMove = (a, b) => {
    if (board[a][b] == 'X' || board[a][b] == 'O') {
      console.log('Not empty');
      players.switchPlayer();
    } else {
      board[a][b] = players.getActivePlayer().playerSymbol;
      gameBoard.printBoard();
    };

    if (checkResult(board, players.getActivePlayer())) console.log(`${players.getActivePlayer().name} won! Reload for new game.`);
    else {
      players.switchPlayer();
      console.log(`${players.getActivePlayer().name}'s turn`);
    };
  };
  return { makeMove };
};

const game = gameFlow(); // game in console

