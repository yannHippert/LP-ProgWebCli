import { ICell, IParams, IPlayers } from '../interfaces/interfaces.js';
import EasyMorpion from './easyMorpion.js';
import { MODES } from './enums.js';
import Morpion, { IWinInfo } from './morpion.js';

let morpion: Morpion | EasyMorpion;
const players: IPlayers = {
  1: 'Player1',
  2: 'Player2',
};

const handleCellClick = (e: MouseEvent) => {
  e.preventDefault();
  const el = e.target as HTMLElement;
  if (!el) return;
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
      const winInfo = morpion.getWinInfo() as IWinInfo;
      markCells(winInfo.cells, winInfo.winDirection);
      if (winInfo.winner) {
        const winner: keyof IPlayers = winInfo.winner as keyof IPlayers;
        setTimeout(() => handleWin(winner), 500);
      }
    }
  }
};

const markCells = (cellIndecies: Array<ICell>, className: string) => {
  const cells = document.querySelectorAll('.cell');
  for (const cell of cells) {
    const cellIndex = getCellIndex(cell as HTMLElement);
    if (containsObject(cellIndex, cellIndecies)) cell.classList.add(className);
  }
};

function getCellIndex(cell: HTMLElement) {
  return {
    row: Number(cell.getAttribute('data-row')),
    col: Number(cell.getAttribute('data-col')),
  };
}

function containsObject(obj: ICell, list: Array<ICell>) {
  for (const item of list) {
    if (item.col === obj.col && item.row === obj.row) return true;
  }
  return false;
}

const handleWin = (winner: keyof IPlayers) => {
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
  if (playedCounter) playedCounter.innerText = String(score.played);
  const drawsCounter = document.getElementById('drawsCounter');
  if (drawsCounter) drawsCounter.innerText = String(score.draws);
  const player1Score = document.getElementById('player1Score');
  if (player1Score) player1Score.innerText = String(score.p1Win);
  const player2Score = document.getElementById('player2Score');
  if (player2Score) player2Score.innerText = String(score.p2Win);
};

const updateTurn = () => {
  const label = document.getElementById('turn-label');
  if (label) {
    const turn = morpion.getTurn() as keyof IPlayers;
    label.innerText = label.innerText = `${players[turn]}'s turn`;
  }
};

const populateBoard = () => {
  const size = morpion.getSize();
  const fieldDiv = document.getElementById('field-container');
  if (!fieldDiv) return;
  fieldDiv.style.setProperty('--width', String(size));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cellDiv = document.createElement('div');
      cellDiv.className = 'cell';
      cellDiv.setAttribute('data-row', String(i));
      cellDiv.setAttribute('data-col', String(j));
      cellDiv.addEventListener('click', handleCellClick);
      fieldDiv.appendChild(cellDiv);
    }
  }
};

const setPlayerNames = (params: IParams) => {
  players[1] = params?.player1 || players[1];
  players[2] = params?.player2 || players[2];
  updateTurn();
  const player1Name = document.querySelector('#player1Name');
  if (player1Name) player1Name.innerHTML = players[1];
  const player2Name = document.querySelector('#player2Name');
  if (player2Name) player2Name.innerHTML = players[2];
};

const getQueryParams = (): IParams => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop: string) => searchParams.get(prop),
  }) as IParams;
  return params;
};

const initBackButton = () => {
  const backButton = document.getElementById('back-button');
  if (backButton)
    backButton.addEventListener('click', () => {
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
