import Morpion from './morpion.js';

class EasyMorpion extends Morpion {
  checkWin(row: number, col: number) {
    return this.evaluateField(row, col, 3);
  }
}

export default EasyMorpion;
