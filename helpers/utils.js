const ACTIVE_STATUS = "live";
const INACTIVE_STATUS = "inactive";

const isInsideCoordinates = (coordinate, gridCoordinate) =>
  coordinate > -1 && coordinate <= gridCoordinate;

const isInsideTheXAxis = (index, dimensions) =>
  isInsideCoordinates(index, dimensions.x);

const isInsideTheYAxis = (index, dimensions) =>
  isInsideCoordinates(index, dimensions.y);

const isSelf = (x, y, i, j) => x === i && y === j;

const isNeighbourAlive = (newRows, x, y) => newRows?.[x]?.[y] === ACTIVE_STATUS;

const setRowStatus = (x, y, status, newRows) => (newRows[x][y] = status);

const checkNeighbors = (x, y, dimensions, newRows) => {
  let neighborsCount = 0;
  let i = 0;
  let j = 0;

  for (i = x - 1; i <= x + 1; ++i) {
    if (isInsideTheXAxis(i, dimensions)) {
      for (j = y - 1; j <= y + 1; ++j) {
        if (
          !isSelf(x, y, i, j) &&
          isInsideTheYAxis(j, dimensions) &&
          isNeighbourAlive(newRows, i, j)
        ) {
          ++neighborsCount;
        }
      }
    }
  }

  newRows[x][y] = getDestiny(neighborsCount, newRows[x][y] === ACTIVE_STATUS);

  return newRows;
};

const createLogicalGrid = (dimensions) => {
  const rows = [];

  [...Array(dimensions.x)].forEach((_, index) => {
    rows.push([]);

    [...Array(dimensions.y)].forEach(() => {
      rows[index].push(INACTIVE_STATUS);
    });
  });

  const newRows = [...rows];

  return {
    rows,
    newRows,
  };
};

const groupCellByStatus = (
  rowIndex,
  cellIndex,
  aliveCells,
  deadCells,
  rows
) => {
  const coordinate = [rowIndex, cellIndex];

  rows[rowIndex][cellIndex] === ACTIVE_STATUS
    ? aliveCells.push(coordinate)
    : deadCells.push(coordinate);
};

const iterateGrid = (grid = [], callback) => {
  grid.map((rows, rowIndex) => {
    rows.map((_, cellIndex) => {
      callback(rowIndex, cellIndex);
    });
  });
};

const getDestiny = (neighborsCount, isAlive) =>
  (isAlive && (neighborsCount === 3 || neighborsCount === 2)) ||
  (isAlive === false && neighborsCount === 3)
    ? ACTIVE_STATUS
    : INACTIVE_STATUS;

const drawGrid = (dimensions, canvasContext, rows, deadColor) => {
  canvasContext.fillStyle = deadColor;

  iterateGrid(rows, (rowIndex, cellIndex) => {
    canvasContext.fillRect(
      rowIndex * dimensions.z,
      cellIndex * dimensions.z,
      dimensions.z,
      dimensions.z
    );
  });
};

const drawCell = (cell, dimensions, canvasContext) => {
  const zDimension = dimensions.z;

  canvasContext.fillRect(
    cell[0] * zDimension,
    cell[1] * zDimension,
    zDimension,
    zDimension
  );
};

export {
  isInsideCoordinates,
  isInsideTheYAxis,
  isInsideTheXAxis,
  isSelf,
  isNeighbourAlive,
  setRowStatus,
  iterateGrid,
  drawGrid,
  getDestiny,
  checkNeighbors,
  createLogicalGrid,
  groupCellByStatus,
  drawCell,
  ACTIVE_STATUS,
  INACTIVE_STATUS,
};
