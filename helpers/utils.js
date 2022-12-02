const ACTIVE_STATUS = "active";
const INACTIVE_STATUS = "inactive";

const isInsideCoordinates = (coordinate, gridCoordinate) =>
  coordinate > -1 && coordinate < gridCoordinate;

const isInsideTheXAxis = (index, dimensions) =>
  isInsideCoordinates(index, dimensions.rows);

const isInsideTheYAxis = (index, dimensions) =>
  isInsideCoordinates(index, dimensions.columns);

const isSelf = (x, y, i, j) => x === i && y === j;

const getDestiny = (neighboursCount, isActive) =>
  (isActive && (neighboursCount === 3 || neighboursCount === 2)) ||
  (isActive === false && neighboursCount === 3)
    ? ACTIVE_STATUS
    : INACTIVE_STATUS;

const getNextGeneration = (rowIndex, cellIndex, dimensions, rows, newRows) => {
  let neighboursCount = 0;
  let i = 0;
  let j = 0;

  for (i = rowIndex - 1; i <= rowIndex + 1; ++i) {
    if (isInsideTheXAxis(i, dimensions)) {
      for (j = cellIndex - 1; j <= cellIndex + 1; ++j) {
        if (
          !isSelf(rowIndex, cellIndex, i, j) &&
          isInsideTheYAxis(j, dimensions) &&
          rows[i][j] === ACTIVE_STATUS
        ) {
          ++neighboursCount;
        }
      }
    }
  }

  newRows[rowIndex][cellIndex] = getDestiny(
    neighboursCount,
    newRows[rowIndex][cellIndex] === ACTIVE_STATUS
  );

  return newRows[rowIndex][cellIndex];
};

const createLogicalMatrix = (dimensions) => {
  const rows = [];

  [...Array(dimensions.rows)].forEach((_, index) => {
    rows.push([]);

    [...Array(dimensions.columns)].forEach(() => {
      rows[index].push(INACTIVE_STATUS);
    });
  });

  const newRows = JSON.parse(JSON.stringify(rows));

  return {
    rows,
    newRows,
  };
};

const iterateMatrix = (matrix = [], callback) => {
  matrix.map((rows, rowIndex) => {
    rows.map((_, cellIndex) => {
      callback(rowIndex, cellIndex);
    });
  });
};

const drawMatrix = (dimensions, canvasContext, rows, deadColor) => {
  const zDimension = dimensions.cellSize;

  canvasContext.fillStyle = deadColor;

  iterateMatrix(rows, (rowIndex, cellIndex) => {
    canvasContext.fillRect(
      rowIndex * zDimension,
      cellIndex * zDimension,
      zDimension,
      zDimension
    );
  });
};

const drawCell = (cell, dimensions, canvasContext) => {
  const zDimension = dimensions.cellSize;

  canvasContext.fillRect(
    cell[0] * zDimension,
    cell[1] * zDimension,
    zDimension,
    zDimension
  );
};

const cloneArray = (vanillaArray) => JSON.parse(JSON.stringify(vanillaArray));

export {
  isInsideCoordinates,
  isInsideTheYAxis,
  isInsideTheXAxis,
  isSelf,
  iterateMatrix,
  drawMatrix,
  getDestiny,
  getNextGeneration,
  createLogicalMatrix,
  drawCell,
  cloneArray,
  ACTIVE_STATUS,
  INACTIVE_STATUS,
};
