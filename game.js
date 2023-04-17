const settings = (() => { // starting screen settings for adding player names and choosing symbols
const form = document.querySelector('form');
function switchDisplay(e) {
  const playerTurn = document.querySelector('.player-turn');
  const boardContainer = document.querySelector('.board-container');
  e.preventDefault();
  form.style.display = 'none'
  boardContainer.style.display = 'grid';
  playerTurn.style.display = 'block'
  game();
};
form.addEventListener('submit', switchDisplay);
})();

const game = () => {
  const player1 = document.getElementById('player-1').value;
  const player2 = document.getElementById('player-2').value;
  let choice1 = document.querySelector('input[name="choice"]:checked').value;
  function getRandomChoice() {
  if (choice1 == 'random') {
    let x = 'X';
    let o = 'O';
    if (Math.random() > 0 && Math.random() <= 0.5) choice1 = x;
    else choice1 = o;
  };
  return choice1;
  };
  getRandomChoice();
  let choice2 = () => choice2 = choice1 === 'X' ? 'O' : 'X';
  const player = [ // list  of players
    {
      name: player1,
      playerSymbol: choice1
    },
    {
      name: player2,
      playerSymbol: choice2(),
    },
    {
      name: 'ai',
      playerSymbol: null
    }
  ];
  const playerTurn = document.querySelector('.player-turn');
  const boardContainer = document.querySelector('.board-container');

  let activePlayer = player[0]; 
  const switchPlayer = () => activePlayer = activePlayer === player[0] ? player[1] : player[0];
  const getActivePlayer = () => activePlayer;
  playerTurn.textContent = `${getActivePlayer().name}'s turn - ${getActivePlayer().playerSymbol}`;

  for (let i = 0; i < 9; i++) { // setting 9 buttons as the board
    const cellButton = document.createElement('button');
    cellButton.setAttribute('id', i);
    boardContainer.appendChild(cellButton);
  };
  
  function checkResult() { // function with game logic and checking if there is a winner or a draw
    let bs = boardContainer.children;
    let cps = getActivePlayer().playerSymbol;
    function alertWinner() {
      switchPlayer();
      setTimeout(() => {
        alert(`${getActivePlayer().name} won!`);
        location.reload();
      }, 50);
    };
    if (bs[0].textContent == cps && bs[4].textContent == cps && bs[8].textContent == cps) return alertWinner();
    if (bs[2].textContent == cps && bs[4].textContent == cps && bs[6].textContent == cps) return alertWinner();
    if (bs[0].textContent == cps && bs[1].textContent == cps && bs[2].textContent == cps) return alertWinner();
    if (bs[3].textContent == cps && bs[4].textContent == cps && bs[5].textContent == cps) return alertWinner();
    if (bs[6].textContent == cps && bs[7].textContent == cps && bs[8].textContent == cps) return alertWinner();
    if (bs[0].textContent == cps && bs[3].textContent == cps && bs[6].textContent == cps) return alertWinner();
    if (bs[1].textContent == cps && bs[4].textContent == cps && bs[7].textContent == cps) return alertWinner();
    if (bs[2].textContent == cps && bs[5].textContent == cps && bs[8].textContent == cps) return alertWinner();
    else if (bs[0].textContent != '' && bs[1].textContent != '' && bs[2].textContent != '' && bs[3].textContent != '' && bs[4].textContent != '' && bs[5].textContent != '' && bs[6].textContent != '' && bs[7].textContent != '' && bs[8].textContent != '') return setTimeout(() => {alert(`It' a draw!`); location.reload();}, 50);
  };
  const makeMove = (a) => { // core function for every move, with game logic
    if (boardContainer.children[a].textContent == 'X' || boardContainer.children[a].textContent == 'O') { // checks if the cell is empty
      playerTurn.textContent = 'Invalid move';
      setTimeout(() => {playerTurn.textContent = `${getActivePlayer().name}'s turn - ${getActivePlayer().playerSymbol}`}, 1300);
    } else {   
      boardContainer.children[a].textContent =  getActivePlayer().playerSymbol; // updates cell's value if it's empty
      checkResult(); // checks if the game is finished
      switchPlayer(); // switches players if the game is not finished
      playerTurn.textContent = `${getActivePlayer().name}'s turn - ${getActivePlayer().playerSymbol}`; // updates the player's name
    };
  };

  function clickHandlerBoard(e) { // function for returning if of selected cell
    const selectedCell = e.target.id;
    if (!selectedCell) return;
    makeMove(selectedCell);
  };
  boardContainer.addEventListener('click', clickHandlerBoard);
};