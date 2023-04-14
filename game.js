const game = (() => {

  const player = [ // list  of players
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
  const switchPlayer = () => activePlayer = activePlayer === player[0] ? player[1] : player[0];
  const getActivePlayer = () => activePlayer;

  const playerTurn = document.querySelector('.player-turn');
  const boardContainer = document.querySelector('.board-container');
  playerTurn.textContent = `${getActivePlayer().name}'s turn`;
  
  for (let i=0; i < 9; i++) { // setting 9 buttons as the board
    const cellButton = document.createElement('button');
    cellButton.setAttribute('id', i);
    boardContainer.appendChild(cellButton);
  };

  function checkResult() { // function with game logic and checking if there is a winner or a draw
    let bs = boardContainer.children;
    let cps = getActivePlayer().playerSymbol;
    if (bs[0].textContent == cps && bs[4].textContent == cps && bs[8].textContent == cps) {switchPlayer(); setTimeout(() => {alert(`${getActivePlayer().name} won!`); location.reload();}, 50);};
    if (bs[2].textContent == cps && bs[4].textContent == cps && bs[6].textContent == cps) {switchPlayer(); setTimeout(() => {alert(`${getActivePlayer().name} won!`); location.reload();}, 50);};
    if (bs[0].textContent == cps && bs[1].textContent == cps && bs[2].textContent == cps) {switchPlayer(); setTimeout(() => {alert(`${getActivePlayer().name} won!`); location.reload();}, 50);};
    if (bs[3].textContent == cps && bs[4].textContent == cps && bs[5].textContent == cps) {switchPlayer(); setTimeout(() => {alert(`${getActivePlayer().name} won!`); location.reload();}, 50);};
    if (bs[6].textContent == cps && bs[7].textContent == cps && bs[8].textContent == cps) {switchPlayer(); setTimeout(() => {alert(`${getActivePlayer().name} won!`); location.reload();}, 50);};
    if (bs[0].textContent == cps && bs[3].textContent == cps && bs[6].textContent == cps) {switchPlayer(); setTimeout(() => {alert(`${getActivePlayer().name} won!`); location.reload();}, 50);};
    if (bs[1].textContent == cps && bs[4].textContent == cps && bs[7].textContent == cps) {switchPlayer(); setTimeout(() => {alert(`${getActivePlayer().name} won!`); location.reload();}, 50);};
    if (bs[2].textContent == cps && bs[5].textContent == cps && bs[8].textContent == cps) {switchPlayer(); setTimeout(() => {alert(`${getActivePlayer().name} won!`); location.reload();}, 50);};
    if (bs[0].textContent != '' && bs[1].textContent != '' && bs[2].textContent != '' && bs[3].textContent != '' && bs[4].textContent != '' && bs[5].textContent != '' && bs[6].textContent != '' && bs[7].textContent != '' && bs[8].textContent != '') return setTimeout(() => {alert(`It' a draw!`); location.reload();}, 50);
  };
  const makeMove = (a) => { // core function for every move, with game logic
    if (boardContainer.children[a].textContent == 'X' || boardContainer.children[a].textContent == 'O') { // checks if the cell is empty
      playerTurn.textContent = 'Invalid move';
      setTimeout(() => {playerTurn.textContent = `${getActivePlayer().name}'s turn`}, 1300);
    } else {   
      boardContainer.children[a].textContent =  getActivePlayer().playerSymbol; // updates cell's value if it's empty
      checkResult(); // checks if the game is finished
      switchPlayer(); // switches players if the game is not finished
      playerTurn.textContent = `${getActivePlayer().name}'s turn`; // updates the player's name
    };
  };

  function clickHandlerBoard(e) { // function for returning if of selected cell
    const selectedCell = e.target.id;
    if (!selectedCell) return;
    makeMove(selectedCell);
  };
  boardContainer.addEventListener('click', clickHandlerBoard);
  
})();