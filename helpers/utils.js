const ACTIVE_STATUS = 'active';
const INACTIVE_STATUS = 'inactive';

const isInsideCoordinates = (coordinate, gridCoordinate) =>
  coordinate > -1 && coordinate < gridCoordinate;

const getDestiny = (neighboursCount, isActive) => {
  // Game of Life rules:
  // 1. Any live cell with 2 or 3 live neighbors survives
  // 2. Any dead cell with exactly 3 live neighbors becomes alive
  // 3. All other cells die or stay dead
  if (
    (isActive && (neighboursCount === 2 || neighboursCount === 3)) ||
    (!isActive && neighboursCount === 3)
  ) {
    return ACTIVE_STATUS;
  }
  return INACTIVE_STATUS;
};

const getNextGeneration = (rowIndex, cellIndex, dimensions, rows, newRows) => {
  let neighboursCount = 0;

  // Count live neighbors with early termination optimization
  for (let i = Math.max(0, rowIndex - 1); i <= Math.min(rowIndex + 1, dimensions.rows - 1); i++) {
    for (
      let j = Math.max(0, cellIndex - 1);
      j <= Math.min(cellIndex + 1, dimensions.columns - 1);
      j++
    ) {
      if ((i !== rowIndex || j !== cellIndex) && rows[i][j] === ACTIVE_STATUS) {
        neighboursCount += 1;
        // Early termination: If we already have 4 neighbors, we know the cell will die
        if (neighboursCount > 3) break;
      }
    }
    // Continue the early termination from the outer loop
    if (neighboursCount > 3) break;
  }

  // Use the current cell's state from rows, not from newRows (which might have been modified)
  const isCurrentlyActive = rows[rowIndex][cellIndex] === ACTIVE_STATUS;
  newRows[rowIndex][cellIndex] = getDestiny(neighboursCount, isCurrentlyActive);

  return newRows[rowIndex][cellIndex];
};

const createLogicalMatrix = (dimensions) => {
  const rows = Array(dimensions.rows)
    .fill()
    .map(() => Array(dimensions.columns).fill(INACTIVE_STATUS));

  // Create newRows efficiently without using JSON methods
  const newRows = Array(dimensions.rows)
    .fill()
    .map(() => Array(dimensions.columns).fill(INACTIVE_STATUS));

  return {
    rows,
    newRows,
  };
};

const iterateMatrix = (matrix = [], callback) => {
  // Using traditional for loops for better performance than forEach
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    const row = matrix[rowIndex];
    for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
      callback(rowIndex, cellIndex);
    }
  }
};

const drawMatrix = (dimensions, canvasContext, rows, deadColor) => {
  const zDimension = dimensions.cellSize;

  canvasContext.fillStyle = deadColor;

  iterateMatrix(rows, (rowIndex, cellIndex) => {
    canvasContext.fillRect(rowIndex * zDimension, cellIndex * zDimension, zDimension, zDimension);
  });
};

const drawCell = (cell, dimensions, canvasContext) => {
  const zDimension = dimensions.cellSize;

  canvasContext.fillRect(cell[0] * zDimension, cell[1] * zDimension, zDimension, zDimension);
};

export {
  isInsideCoordinates,
  iterateMatrix,
  drawMatrix,
  getDestiny,
  getNextGeneration,
  createLogicalMatrix,
  drawCell,
  ACTIVE_STATUS,
  INACTIVE_STATUS,
};
