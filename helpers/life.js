import {
  ACTIVE_STATUS,
  INACTIVE_STATUS,
  drawGrid,
  iterateGrid,
  checkNeighbors,
  setRowStatus,
  createLogicalGrid,
  groupCellByStatus,
  drawCell,
} from "./utils";

let requestAnimationFrameId = "";
let newRows = [];
let rows = [];
let globalDimensions = { x: 0, y: 0, z: 0 };
let canvasContext = {};
let generationsCounter = 0;
let generationsCallback;

let activeColor = "#FC6336";
let inactiveColor = "#5F4B8B";

const drawSurvivors = (rows) => {
  const aliveCells = [];
  const deadCells = [];

  iterateGrid(rows, (rowIndex, cellIndex) => {
    groupCellByStatus(rowIndex, cellIndex, aliveCells, deadCells, rows);
  });

  const drawCellCallback = (cell) =>
    drawCell(cell, globalDimensions, canvasContext);

  canvasContext.fillStyle = activeColor;
  aliveCells.map(drawCellCallback, activeColor);

  canvasContext.fillStyle = inactiveColor;
  deadCells.map(drawCellCallback, inactiveColor);
};

const advanceOneGeneration = () => {
  iterateGrid(rows, (rowIndex, cellIndex) =>
    checkNeighbors(rowIndex, cellIndex, globalDimensions, newRows)
  );

  rows = newRows;

  drawSurvivors(rows);

  generationsCounter += 1;

  if (generationsCallback) generationsCallback(generationsCounter);
};

const runGrid = () => {
  advanceOneGeneration();

  requestAnimationFrameId = requestAnimationFrame(runGrid);
};

const resetGrid = ({ callback }) => {
  const { rows: createdRows, newRows: createdNewRows } = createLogicalGrid(
    globalDimensions
  );

  rows = createdRows;
  newRows = createdNewRows;

  drawGrid(globalDimensions, canvasContext, rows, inactiveColor);

  callback(0);
};

const init = ({ dimensions, canvas, callback }) => {
  globalDimensions = dimensions;
  generationsCallback = callback;

  canvasContext = canvas.getContext("2d", { alpha: false });
  canvasContext.scale(globalDimensions.scale, globalDimensions.scale);

  resetGrid({ callback });
};

const selectSurvivor = (selectedSurvivor, status) => {
  const survivor = rows[selectedSurvivor[0]]?.[selectedSurvivor[1]] || [];

  if (survivor.length === 0) return false;

  let newStatus = status
    ? status
    : survivor === INACTIVE_STATUS
    ? ACTIVE_STATUS
    : INACTIVE_STATUS;

  setRowStatus(selectedSurvivor[0], selectedSurvivor[1], newStatus, newRows);

  drawSurvivors(rows);
};

const setColors = (colors) => {
  activeColor = colors.alive ?? activeColor;
  inactiveColor = colors.dead ?? inactiveColor;
};

const getGenerations = () => generationsCounter;

const start = () => (requestAnimationFrameId = requestAnimationFrame(runGrid));

const stop = () => cancelAnimationFrame(requestAnimationFrameId);

const Life = {
  init,
  selectSurvivor,
  setColors,
  resetGrid,
  advanceOneGeneration,
  getGenerations,
  start,
  stop,
};

export default Life;
