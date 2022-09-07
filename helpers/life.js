const LIVE = "live";
const DIE = "die";

let aliveColor = "#FC6336";
let deadColor = "#5F4B8B";
let requestAnimationFrameId = "";
let newRows = [];
let rows = [];
let dimensions = { x: 0, y: 0, z: 0 };
let canvasContext = {};

const isInsideCoordinates = (coordinate, gridCoordinate) =>
  coordinate > -1 && coordinate <= gridCoordinate;

const isNotItself = (x, y, i, j) => (x === i && y === j) === false;

const isInsideTheXAxis = (index) => isInsideCoordinates(index, dimensions.x);

const isInsideTheYAxis = (index) => isInsideCoordinates(index, dimensions.y);

const isNeighbourAlive = (newRows, x, y) => newRows?.[x]?.[y] === LIVE;

const getDestiny = (neighborsCount, isAlive) =>
  (isAlive && (neighborsCount === 3 || neighborsCount === 2)) ||
  (isAlive === false && neighborsCount === 3)
    ? LIVE
    : DIE;

const checkNeighbors = (x, y) => {
  let neighborsCount = 0;
  let i = 0;
  let j = 0;

  for (i = x - 1; i <= x + 1; ++i) {
    if (isInsideTheXAxis(i)) {
      for (j = y - 1; j <= y + 1; ++j) {
        if (
          isNotItself(x, y, i, j) &&
          isInsideTheYAxis(j) &&
          isNeighbourAlive(newRows, i, j)
        ) {
          ++neighborsCount;
        }
      }
    }
  }

  newRows[x][y] = getDestiny(neighborsCount, newRows[x][y] === LIVE);

  return newRows;
};

const groupCellByStatus = (rowIndex, cellIndex, aliveCells, deadCells) => {
  const cell = rows[rowIndex][cellIndex];
  const coordinate = [rowIndex, cellIndex];

  cell === LIVE ? aliveCells.push(coordinate) : deadCells.push(coordinate);
};

const updateRows = (newRows) => (rows = newRows);

const setRowStatus = (x, y, status) => (newRows[x][y] = status);

const drawCells = (cell) => {
  const zDimension = dimensions.z;

  canvasContext.fillRect(
    cell[0] * zDimension,
    cell[1] * zDimension,
    zDimension,
    zDimension
  );
};

const iterateGrid = (grid = [], callback) => {
  grid.map((rows, rowIndex) => {
    rows.map((_, cellIndex) => {
      callback(rowIndex, cellIndex);
    });
  });
};

const createGrid = () => {
  rows = [];
  newRows = [];

  [...Array(dimensions.x)].forEach((_, index) => {
    rows.push([]);
    newRows.push([]);

    [...Array(dimensions.y)].forEach(() => {
      rows[index].push(DIE);
      newRows[index].push(DIE);
    });
  });
};

const drawGrid = () => {
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

const setupGrid = (params) => {
  dimensions = params.dimensions;

  if (params.canvas) {
    canvasContext = params.canvas.getContext("2d");
    canvasContext.scale(params.dimensions.scale, params.dimensions.scale);
  }
};

const updateSurvivors = (rows) => {
  const aliveCells = [];
  const deadCells = [];

  iterateGrid(rows, (rowIndex, cellIndex) => {
    groupCellByStatus(rowIndex, cellIndex, aliveCells, deadCells);
  });

  canvasContext.fillStyle = aliveColor;
  aliveCells.map(drawCells);

  canvasContext.fillStyle = deadColor;
  deadCells.map(drawCells);
};

const advanceOneGeneration = () => {
  iterateGrid(rows, checkNeighbors);
  updateRows(newRows);
  updateSurvivors(rows);

  generationsCounter += 1;

  if (callback) callback(generationsCounter);
};

const runGrid = () => {
  advanceOneGeneration();

  requestAnimationFrameId = requestAnimationFrame(runGrid);
};

let generationsCounter = 0;

let callback;

const Life = (() => ({
  init(params) {
    setupGrid(params);
    createGrid();
    drawGrid();

    callback = params.callback;
  },
  advanceOneGeneration() {
    advanceOneGeneration();
  },
  getGenerations() {
    return generationsCounter;
  },
  selectSurvivor(selectedSurvivor, status) {
    const survivor =
      rows[selectedSurvivor[0]] &&
      rows[selectedSurvivor[0]][selectedSurvivor[1]]
        ? rows[selectedSurvivor[0]][selectedSurvivor[1]]
        : [];

    if (survivor.length === 0) return false;

    let newStatus = status ? status : survivor === DIE ? LIVE : DIE;

    setRowStatus(selectedSurvivor[0], selectedSurvivor[1], newStatus);
    updateRows(newRows);
    updateSurvivors(rows);
  },
  setColors(colors) {
    aliveColor = colors.alive ?? aliveColor;
    deadColor = colors.dead ?? deadColor;
  },
  clearGrid() {
    drawGrid();
    createGrid();
  },
  start() {
    requestAnimationFrameId = requestAnimationFrame(runGrid);
  },
  stop() {
    cancelAnimationFrame(requestAnimationFrameId);
  },
}))();

export {
  isInsideTheXAxis,
  isInsideTheYAxis,
  getDestiny,
  setRowStatus,
  checkNeighbors,
  setupGrid,
  createGrid,
};

export default Life;
