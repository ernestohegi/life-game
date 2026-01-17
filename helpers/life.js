import {
  ACTIVE_STATUS,
  INACTIVE_STATUS,
  drawMatrix,
  iterateMatrix,
  getNextGeneration,
  createLogicalMatrix,
  drawCell,
} from './utils';

let requestAnimationFrameId = '';
let newRows = [];
let rows = [];
let globalDimensions = { rows: 0, columns: 0, cellSize: 0, scale: 0 };
let canvasContext = {};
let generationsCounter = 0;
let generationsCallback;
let activeColor = '#FC6336';
let inactiveColor = '#5F4B8B';
// Frame rate control variables
let lastFrameTime = 0;
let targetFPS = 30; // Default FPS
let fpsInterval = 1000 / targetFPS;

// Efficient array cloning helper
const cloneGrid = (grid) => {
  return grid.map((row) => [...row]);
};

const drawSurvivors = (rows) => {
  try {
    iterateMatrix(rows, (rowIndex, cellIndex) => {
      const isActive = rows[rowIndex][cellIndex] === ACTIVE_STATUS;
      canvasContext.fillStyle = isActive ? activeColor : inactiveColor;
      drawCell([rowIndex, cellIndex], globalDimensions, canvasContext);
    });
  } catch (error) {
    console.error('Error drawing survivors:', error);
    stop(); // Stop animation if there's an error
  }
};

const advanceOneGeneration = () => {
  try {
    iterateMatrix(rows, (rowIndex, cellIndex) => {
      getNextGeneration(rowIndex, cellIndex, globalDimensions, rows, newRows);
    });

    rows = cloneGrid(newRows);

    drawSurvivors(rows);

    generationsCounter += 1;

    if (generationsCallback) generationsCallback(generationsCounter);
  } catch (error) {
    console.error('Error advancing generation:', error);
    stop(); // Stop animation if there's an error
  }
};

const runGrid = (timestamp) => {
  requestAnimationFrameId = requestAnimationFrame(runGrid);

  // Control frame rate
  const elapsed = timestamp - lastFrameTime;

  if (elapsed > fpsInterval) {
    // Adjust for timing drift
    lastFrameTime = timestamp - (elapsed % fpsInterval);
    advanceOneGeneration();
  }
};

const resetGrid = ({ callback }) => {
  try {
    const { rows: createdRows, newRows: createdNewRows } = createLogicalMatrix(globalDimensions);

    rows = createdRows;
    newRows = createdNewRows;

    drawMatrix(globalDimensions, canvasContext, rows, inactiveColor);

    generationsCounter = 0;
    callback(0);
  } catch (error) {
    console.error('Error resetting grid:', error);
  }
};

const initialise = ({ dimensions, canvas, callback, fps }) => {
  try {
    globalDimensions = dimensions;
    generationsCallback = callback;

    // Set FPS if provided
    if (fps && !isNaN(fps)) {
      setFPS(fps);
    }

    canvasContext = canvas.getContext('2d', { alpha: false });
    canvasContext.scale(globalDimensions.scale, globalDimensions.scale);

    resetGrid({ callback });
    return true;
  } catch (error) {
    console.error('Error initializing game:', error);
    return false;
  }
};

const selectSurvivor = (selectedSurvivor) => {
  try {
    const [rowIndex, cellIndex] = selectedSurvivor;

    // Check if coordinates are valid
    if (
      rowIndex < 0 ||
      rowIndex >= globalDimensions.rows ||
      cellIndex < 0 ||
      cellIndex >= globalDimensions.columns
    ) {
      return false;
    }

    // Toggle the cell state
    const newState = rows[rowIndex][cellIndex] === ACTIVE_STATUS ? INACTIVE_STATUS : ACTIVE_STATUS;
    newRows[rowIndex][cellIndex] = newState;

    // Update main grid
    rows = cloneGrid(newRows);

    // Redraw the grid
    drawSurvivors(rows);

    return true;
  } catch (error) {
    console.error('Error selecting survivor:', error);
    return false;
  }
};

const setColors = (colors) => {
  activeColor = colors.alive ?? activeColor;
  inactiveColor = colors.dead ?? inactiveColor;
};

// Control the animation frame rate
const setFPS = (fps) => {
  if (fps > 0) {
    targetFPS = fps;
    fpsInterval = 1000 / targetFPS;
    return true;
  }
  return false;
};

const start = () => {
  lastFrameTime = performance.now();
  requestAnimationFrameId = requestAnimationFrame(runGrid);
};

const stop = () => {
  if (requestAnimationFrameId) {
    cancelAnimationFrame(requestAnimationFrameId);
    requestAnimationFrameId = null;
  }
};

const Life = {
  initialise,
  selectSurvivor,
  setColors,
  resetGrid,
  advanceOneGeneration,
  setFPS,
  start,
  stop,
};

export default Life;
