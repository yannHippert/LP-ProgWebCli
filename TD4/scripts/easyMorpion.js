import Morpion from './morpion.js';

class EasyMorpion extends Morpion {
  checkWin(row, col) {
    return this.evaluateField(row, col, 3);
  }
}

export default EasyMorpion;
