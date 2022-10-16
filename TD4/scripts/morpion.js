import {
  getHorizontalCells,
  getVerticalCells,
  getDiagonalCells,
  getInverseDiagonalCells,
} from './matrix.js';
import { DIRECTIONS } from './enums.js';

class Morpion {
  #size;
  #field;
  #playedTurns;
  #turnToken;
  #isGameOver;
  #winInfo;
  #score;

  constructor(size) {
    this.#size = this.isValidSize(size) ? size : 3;
    this.reset();
    this.#turnToken = 1;
    this.#score = {
      played: 0,
      draws: 0,
      p1Win: 0,
      p2Win: 0,
    };
    this.populateField();
  }

  populateField() {
    this.#field = [];
    for (let x = 0; x < this.#size; x++)
      this.#field.push(new Array(this.#size).fill(0));
  }

  reset() {
    this.#isGameOver = false;
    this.#winInfo = {
      cells: [],
      winDirection: undefined,
    };
    this.#playedTurns = 0;
    this.populateField();
  }

  isValidSize(size) {
    if (!Number.isInteger(size)) return false;
    return size > 2;
  }

  get(row, col) {
    return this.#field[row][col];
  }

  getSize() {
    return this.#size;
  }

  setSize(size) {
    this.#size = size;
    this.reset();
  }

  getTurn() {
    return this.#turnToken;
  }

  isGameOver() {
    return this.#isGameOver;
  }

  isDraw() {
    return this.#winInfo.cells.length === 0;
  }

  play(row, col) {
    if (!this.#isGameOver && this.#field[row][col] === 0) {
      this.#field[row][col] = this.#turnToken;
      if (this.checkWin(row, col) !== undefined) {
        this.#score[`p${this.#turnToken}Win`] += 1;
        this.#score.played += 1;
        this.#isGameOver = true;
      } else if (this.#playedTurns + 1 === this.#size * this.#size) {
        this.#score.played++;
        this.#score.draws++;
        this.#isGameOver = true;
      }
      this.updateTurn();
      return true;
    }
    return false;
  }

  updateTurn() {
    this.#playedTurns += 1;
    this.#turnToken = (this.#turnToken % 2) + 1;
  }

  getScore() {
    return this.#score;
  }

  getChecks(row, col) {
    return [
      {
        cells: getHorizontalCells(this.#field, row, col),
        label: DIRECTIONS.HORITONTAL,
      },
      {
        cells: getVerticalCells(this.#field, row, col),
        label: DIRECTIONS.VERTICAL,
      },
      {
        cells: getDiagonalCells(this.#field, row, col),
        label: DIRECTIONS.DIAGONAL,
      },
      {
        cells: getInverseDiagonalCells(this.#field, row, col),
        label: DIRECTIONS.INVERSE_DIAGONAL,
      },
    ];
  }

  checkWin(row, col) {
    return this.evaluateField(row, col);
  }

  evaluateField(row, col, minCount = this.#size) {
    for (const check of this.getChecks(row, col)) {
      if (check.cells.length >= minCount) {
        this.#winInfo = {
          cells: check.cells,
          winDirection: check.label,
          winner: this.#field[row][col],
        };
        return check.label;
      }
    }
    return undefined;
  }

  getWinInfo() {
    return this.#winInfo;
  }
}

export default Morpion;
