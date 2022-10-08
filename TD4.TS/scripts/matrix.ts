const getHorizontalCells = (
  matrix: Array<Array<number>>,
  row: number,
  col: number
) => {
  const value = matrix[row][col];
  const cells = [];
  let tempCol = col;
  while (tempCol > 0 && matrix[row][tempCol - 1] === value) {
    tempCol -= 1;
    cells.push({ row, col: tempCol });
  }
  cells.push({ row, col });
  tempCol = col;
  while (tempCol < matrix.length - 1 && matrix[row][tempCol + 1] === value) {
    tempCol += 1;
    cells.push({ row, col: tempCol });
  }
  return cells;
};

const getVerticalCells = (
  matrix: Array<Array<number>>,
  row: number,
  col: number
) => {
  const value = matrix[row][col];
  const cells = [];
  let tempRow = row;
  while (tempRow > 0 && matrix[tempRow - 1][col] === value) {
    tempRow -= 1;
    cells.push({ row: tempRow, col });
  }
  cells.push({ row, col });
  tempRow = row;
  while (tempRow < matrix.length - 1 && matrix[tempRow + 1][col] === value) {
    tempRow += 1;
    cells.push({ row: tempRow, col });
  }
  return cells;
};

const getDiagonalCells = (
  matrix: Array<Array<number>>,
  row: number,
  col: number
) => {
  const value = matrix[row][col];
  const cells = [];
  let tempRow = row;
  let tempCol = col;
  while (
    tempRow > 0 &&
    tempCol < matrix.length - 1 &&
    matrix[tempRow - 1][tempCol + 1] === value
  ) {
    tempRow -= 1;
    tempCol += 1;
    cells.push({ row: tempRow, col: tempCol });
  }
  cells.push({ row, col });
  tempRow = row;
  tempCol = col;
  while (
    tempRow < matrix.length - 1 &&
    tempCol > 0 &&
    matrix[tempRow + 1][tempCol - 1] === value
  ) {
    tempRow += 1;
    tempCol -= 1;
    cells.push({ row: tempRow, col: tempCol });
  }
  return cells;
};

const getInverseDiagonalCells = (
  matrix: Array<Array<number>>,
  row: number,
  col: number
) => {
  const value = matrix[row][col];
  const cells = [];
  let tempRow = row;
  let tempCol = col;
  while (
    tempRow > 0 &&
    tempCol > 0 &&
    matrix[tempRow - 1][tempCol - 1] === value
  ) {
    tempRow -= 1;
    tempCol -= 1;
    cells.push({ row: tempRow, col: tempCol });
  }
  cells.push({ row, col });
  tempRow = row;
  tempCol = col;
  while (
    tempRow < matrix.length - 1 &&
    tempCol < matrix.length - 1 &&
    matrix[tempRow + 1][tempCol + 1] === value
  ) {
    tempRow += 1;
    tempCol += 1;
    cells.push({ row: tempRow, col: tempCol });
  }
  return cells;
};

export {
  getHorizontalCells,
  getVerticalCells,
  getDiagonalCells,
  getInverseDiagonalCells,
};
