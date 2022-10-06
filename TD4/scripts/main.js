import EasyMorpion from './easyMorpion.js';
import { MODES } from './enums.js';
import Morpion from './morpion.js';

let morpion;
const players = {
  1: 'Player1',
  2: 'Player2',
};

const handleCellClick = (e) => {
  e.preventDefault();
  const el = e.target;
  const row = Number(el.getAttribute('data-row'));
  const col = Number(el.getAttribute('data-col'));
  if (morpion.play(row, col)) {
    el.classList.add(morpion.get(row, col) === 1 ? 'red' : 'blue');
    updateTurn();
  }
  if (morpion.isGameOver()) {
    updateScoreboard();
    if (morpion.isDraw()) {
      setTimeout(() => handleDraw(), 500);
    } else {
      const winInfo = morpion.getWinInfo();
      markCells(winInfo.cells, winInfo.winDirection);
      setTimeout(() => handleWin(winInfo.winner), 500);
    }
  }
};

const markCells = (cellIndecies, className) => {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    const cellIndex = getCellIndex(cell);
    if (containsObject(cellIndex, cellIndecies)) cell.classList.add(className);
  });
};

function getCellIndex(cell) {
  return {
    row: Number(cell.getAttribute('data-row')),
    col: Number(cell.getAttribute('data-col')),
  };
}

function containsObject(obj, list) {
  for (const item of list) {
    if (item.col === obj.col && item.row === obj.row) return true;
  }
  return false;
}

const handleWin = (winner) => {
  const playAgain = confirm(
    players[winner] + ' won! \nDo you want to play again?'
  );
  if (playAgain) reset();
};

const handleDraw = () => {
  const playAgain = confirm(
    'This game was a draw! \nDo you want to play again?'
  );
  if (playAgain) reset();
};

const reset = () => {
  morpion.reset();
  const cells = document.querySelectorAll('.cell');
  const classes = [
    'red',
    'blue',
    'vertical',
    'horizontal',
    'diagonal',
    'inverseDiagonal',
  ];
  cells.forEach((cell) => {
    classes.forEach((cssClass) => {
      cell.classList.remove(cssClass);
    });
  });
};

const updateScoreboard = () => {
  const score = morpion.getScore();
  const playedCounter = document.getElementById('playedCounter');
  playedCounter.innerText = score.played;
  const drawsCounter = document.getElementById('drawsCounter');
  drawsCounter.innerText = score.draws;
  const player1Score = document.getElementById('player1Score');
  player1Score.innerText = score.p1Win;
  const player2Score = document.getElementById('player2Score');
  player2Score.innerText = score.p2Win;
};

const updateTurn = () => {
  const label = document.querySelector('#turn-label');
  label.innerText = label.innerText = `${players[morpion.getTurn()]}'s turn`;
};

const populateBoard = () => {
  const size = morpion.getSize();
  const fieldDiv = document.getElementById('field-container');
  fieldDiv.className = `grid-${size}`;
  const cellTemplate = document.getElementById('cell-template');
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cellDiv = cellTemplate.content.cloneNode(true).querySelector('div');
      cellDiv.setAttribute('data-row', i);
      cellDiv.setAttribute('data-col', j);
      cellDiv.addEventListener('click', handleCellClick);
      fieldDiv.appendChild(cellDiv);
    }
  }
};

const setPlayerNames = (params) => {
  players[1] = params?.player1 || players[1];
  players[2] = params?.player2 || players[2];
  updateTurn();
  document.querySelector('#player1Name').innerText = players[1];
  document.querySelector('#player2Name').innerText = players[2];
};

const getQueryParams = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  return params;
};

const initBackButton = () => {
  document.getElementById('back-button').addEventListener('click', () => {
    window.location.href =
      './?' + new URLSearchParams(window.location.search).toString();
  });
};

const onLoad = () => {
  const params = getQueryParams();
  const size = Number(params.size);
  morpion =
    params.mode === MODES.EASY ? new EasyMorpion(size) : new Morpion(size);
  populateBoard();
  setPlayerNames(params);
  initBackButton();
};

window.addEventListener('load', () => onLoad());
