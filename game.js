const settings = (() => { // starting screen settings for adding player names and choosing symbols
const form = document.querySelector('form');
const playerTurn = document.querySelector('.player-turn');
const boardContainer = document.querySelector('.board-container');
function switchDisplay(e) {
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
  if (activePlayer.playerSymbol == 'O') activePlayer = player[1]; // statement for 'X' being the first one to make a move
  const switchPlayer = () => activePlayer = activePlayer === player[0] ? player[1] : player[0];
  const getActivePlayer = () => activePlayer;
  playerTurn.textContent = `${getActivePlayer().name}'s turn - ${getActivePlayer().playerSymbol}`;

  for (let i = 0; i < 9; i++) { // setting 9 buttons as the board
    const cellButton = document.createElement('button');
    cellButton.setAttribute('id', i);
    boardContainer.appendChild(cellButton);
  };

  const alertDiv = document.querySelector('.alert');
  function checkResult() { // function with game logic and checking if there is a winner or a draw, and also declaring result
    const alertP = document.querySelector('.alert-para');
    let bs = boardContainer.children;
    let cps = getActivePlayer().playerSymbol;
    function alertWinner() { // custom alert box for declaring result
      switchPlayer();
      boardContainer.classList.add('disabled', 'alert-opacity-low');
      boardContainer.removeEventListener('click', clickHandlerBoard);
      setTimeout(() => {
      playerTurn.textContent = '';
      alertDiv.style.display = 'flex';
      alertDiv.classList.add('alert-opacity-high');
      alertP.textContent = `${getActivePlayer().name} won!`;
      }, 300);
    };
    if (bs[0].textContent == cps && bs[4].textContent == cps && bs[8].textContent == cps) {
      bs[0].style.backgroundColor = '#26734d';
      bs[4].style.backgroundColor = '#26734d';
      bs[8].style.backgroundColor = '#26734d';
      return alertWinner();
    };
    if (bs[2].textContent == cps && bs[4].textContent == cps && bs[6].textContent == cps) {
      bs[2].style.backgroundColor = '#26734d';
      bs[4].style.backgroundColor = '#26734d';
      bs[6].style.backgroundColor = '#26734d';
      return alertWinner();
    };
    if (bs[0].textContent == cps && bs[1].textContent == cps && bs[2].textContent == cps) {
      bs[0].style.backgroundColor = '#26734d';
      bs[1].style.backgroundColor = '#26734d';
      bs[2].style.backgroundColor = '#26734d';
      return alertWinner();
    };
    if (bs[3].textContent == cps && bs[4].textContent == cps && bs[5].textContent == cps) {
      bs[3].style.backgroundColor = '#26734d';
      bs[4].style.backgroundColor = '#26734d';
      bs[5].style.backgroundColor = '#26734d';
      return alertWinner();
    };
    if (bs[6].textContent == cps && bs[7].textContent == cps && bs[8].textContent == cps) {
      bs[6].style.backgroundColor = '#26734d';
      bs[7].style.backgroundColor = '#26734d';
      bs[8].style.backgroundColor = '#26734d';
      return alertWinner();
    };
    if (bs[0].textContent == cps && bs[3].textContent == cps && bs[6].textContent == cps) {
      bs[0].style.backgroundColor = '#26734d';
      bs[3].style.backgroundColor = '#26734d';
      bs[6].style.backgroundColor = '#26734d';
      return alertWinner();
    };
    if (bs[1].textContent == cps && bs[4].textContent == cps && bs[7].textContent == cps) {
      bs[1].style.backgroundColor = '#26734d';
      bs[4].style.backgroundColor = '#26734d';
      bs[7].style.backgroundColor = '#26734d';
      return alertWinner();
    };
    if (bs[2].textContent == cps && bs[5].textContent == cps && bs[8].textContent == cps) {
      bs[2].style.backgroundColor = '#26734d';
      bs[5].style.backgroundColor = '#26734d';
      bs[8].style.backgroundColor = '#26734d';
      return alertWinner();
    }
    else if (bs[0].textContent != '' && bs[1].textContent != '' && bs[2].textContent != '' && bs[3].textContent != '' && bs[4].textContent != '' && bs[5].textContent != '' && bs[6].textContent != '' && bs[7].textContent != '' && bs[8].textContent != '') {
      boardContainer.classList.add('disabled', 'alert-opacity-low');
      boardContainer.removeEventListener('click', clickHandlerBoard);
      setTimeout(() => {
      playerTurn.textContent = '';
      alertDiv.style.display = 'flex';
      alertDiv.classList.add('alert-opacity-high');
      alertP.textContent = `It's a draw!`;
      }, 300);
    };
  };
  const makeMove = (a) => { // core function for every move, with game logic
    if (boardContainer.children[a].textContent == 'X' || boardContainer.children[a].textContent == 'O') { // checks if the cell is empty
      playerTurn.textContent = 'Invalid move';
      setTimeout(() => {playerTurn.textContent = `${getActivePlayer().name}'s turn - ${getActivePlayer().playerSymbol}`}, 1200);
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

  const playAgain = document.querySelector('.play-again');

  function playAnotherRound() { // playing another round with the same players
    alertDiv.style.display = 'none';
    boardContainer.textContent = '';
    boardContainer.classList.remove('disabled', 'alert-opacity-low');
    boardContainer.removeEventListener('click', clickHandlerBoard);
    playAgain.removeEventListener('click', playAnotherRound);
    game();
  };
  playAgain.addEventListener('click', playAnotherRound);
};
