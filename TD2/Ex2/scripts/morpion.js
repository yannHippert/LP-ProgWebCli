import {
  getHorizontalCells,
  getVerticalCells,
  getDiagonalCells,
  getInverseDiagonalCells,
} from './matrix.js';
import { DIRECTIONS } from './enums.js';

const MODES = {
  HARD: 'hard',
  EASY: 'easy',
};

class Morpion {
  constructor(settings) {
    this.size = this.isValidSize(settings?.size) ? settings.size : 3;
    this.mode = this.isValidMode(settings?.mode) ? settings.mode : MODES.EASY;
    this.playedTurns = 0;
    this.turnToken = 1;
    this.__isGameOver = false;
    this._winningCells = [];
    this._direction = undefined;
    this.score = {
      played: 0,
      draws: 0,
      p1Win: 0,
      p2Win: 0,
    };
    this.populateField();
  }

  populateField() {
    this.field = [];
    for (let x = 0; x < this.size; x++)
      this.field.push(new Array(this.size).fill(0));
  }

  reset() {
    this._isGameOver = false;
    this._winningCells = [];
    this.playedTurns = 0;
    this.populateField();
  }

  isValidSize(size) {
    if (!Number.isInteger(size)) return false;
    return size > 2;
  }

  isValidMode(mode) {
    return Object.values(MODES).includes(mode);
  }

  get(row, col) {
    return this.field[row][col];
  }

  getSize() {
    return this.size;
  }

  setSize(size) {
    this.size = size;
    this.reset();
  }

  setMode(mode) {
    this.mode = mode;
  }

  getTurn() {
    return this.turnToken;
  }

  isGameOver() {
    return this._isGameOver;
  }

  isDraw() {
    return this._winningCells.length === 0;
  }

  play(row, col) {
    if (!this._isGameOver && this.field[row][col] === 0) {
      this.field[row][col] = this.turnToken;
      if (this.checkWin(row, col) !== undefined) {
        this.score[`p${this.turnToken}Win`]++;
        this.score.played++;
        this._isGameOver = true;
      } else if (this.playedTurns + 1 === this.size * this.size) {
        this.score.played++;
        this.score.draws++;
        this._isGameOver = true;
        this._isDraw = true;
      }
      this.updateTurn();
      return true;
    }
    return false;
  }

  updateTurn() {
    this.playedTurns++;
    this.turnToken = (this.turnToken % 2) + 1;
  }

  getScore() {
    return this.score;
  }

  checkWin(row, col) {
    const minCount = this.mode === MODES.EASY ? 3 : this.size;
    const checks = [
      { cells: getHorizontalCells, label: DIRECTIONS.HORITONTAL },
      { cells: getVerticalCells, label: DIRECTIONS.VERTICAL },
      { cells: getDiagonalCells, label: DIRECTIONS.DIAGONAL },
      { cells: getInverseDiagonalCells, label: DIRECTIONS.INVERSE_DIAGONAL },
    ];
    for (const check of checks) {
      const cells = check.cells(this.field, row, col);
      if (cells.length >= minCount) {
        this._winningCells = cells;
        this._direction = check.label;
        return check.label;
      }
    }
    return undefined;
  }

  getWinInfo() {
    return { cells: this._winningCells, type: this._direction };
  }
}

export default Morpion;
export { MODES };
