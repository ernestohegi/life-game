import {
  ACTIVE_STATUS,
  INACTIVE_STATUS,
  drawMatrix,
  iterateMatrix,
  getNextGeneration,
  createLogicalMatrix,
  drawCell,
} from "./utils";

let requestAnimationFrameId = "";
let newRows = [];
let rows = [];
let globalDimensions = { rows: 0, columns: 0, cellSize: 0, scale: 0 };
let canvasContext = {};
let generationsCounter = 0;
let generationsCallback;
let activeColor = "#FC6336";
let inactiveColor = "#5F4B8B";

const drawSurvivors = (rows) => {
  const activeCells = [];
  const inactiveCells = [];

  iterateMatrix(rows, (rowIndex, cellIndex) => {
    const coordinates = [rowIndex, cellIndex];

    rows[rowIndex][cellIndex] === ACTIVE_STATUS
      ? activeCells.push(coordinates)
      : inactiveCells.push(coordinates);
  });

  const drawCellCallback = (cell) =>
    drawCell(cell, globalDimensions, canvasContext);

  canvasContext.fillStyle = activeColor;
  activeCells.map(drawCellCallback, activeColor);

  canvasContext.fillStyle = inactiveColor;
  inactiveCells.map(drawCellCallback, inactiveColor);
};

const advanceOneGeneration = () => {
  iterateMatrix(rows, (rowIndex, cellIndex) => {
    getNextGeneration(rowIndex, cellIndex, globalDimensions, rows, newRows);
  });

  rows = structuredClone(newRows);

  drawSurvivors(rows);

  generationsCounter += 1;

  if (generationsCallback) generationsCallback(generationsCounter);
};

const runGrid = () => {
  advanceOneGeneration();

  requestAnimationFrameId = requestAnimationFrame(runGrid);
};

const resetGrid = ({ callback }) => {
  const { rows: createdRows, newRows: createdNewRows } = createLogicalMatrix(
    globalDimensions
  );

  rows = createdRows;
  newRows = createdNewRows;

  drawMatrix(globalDimensions, canvasContext, rows, inactiveColor);

  callback(0);
};

const initialise = ({ dimensions, canvas, callback }) => {
  globalDimensions = dimensions;
  generationsCallback = callback;

  canvasContext = canvas.getContext("2d", { alpha: false });
  canvasContext.scale(globalDimensions.scale, globalDimensions.scale);

  resetGrid({ callback });
};

const selectSurvivor = (selectedSurvivor) => {
  const survivor = rows[selectedSurvivor[0]]?.[selectedSurvivor[1]] || [];

  if (survivor.length === 0) return false;

  newRows[selectedSurvivor[0]][selectedSurvivor[1]] = ACTIVE_STATUS;

  rows = structuredClone(newRows);

  drawSurvivors(rows);
};

const setColors = (colors) => {
  activeColor = colors.alive ?? activeColor;
  inactiveColor = colors.dead ?? inactiveColor;
};

const start = () => (requestAnimationFrameId = requestAnimationFrame(runGrid));

const stop = () => cancelAnimationFrame(requestAnimationFrameId);

const Life = {
  initialise,
  selectSurvivor,
  setColors,
  resetGrid,
  advanceOneGeneration,
  start,
  stop,
};

export default Life;
