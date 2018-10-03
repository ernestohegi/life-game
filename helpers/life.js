import {
  checkNeighbors,
  isNotItself,
  isInsideTheXAxis,
  isInsideTheYAxis,
  isInsideTheCoordinates,
  isNeighborAlive
} from "./Doctor";
import { createGrid, iterateGrid, setGridSize } from "./Grid";
import { drawCell, setCanvasContext, setFillStyle } from "./Painter";

const Life = (() => {
  const LIVE = "live";
  const DIE = "die";

  let aliveColor = "#FC6336";
  let deadColor = "#5F4B8B";

  let requestAnimationFrameId = "",
    newRows = [],
    rows = [],
    dimensions = { x: 0, y: 0, z: 0 };

  const drawGrid = () => {
    setFillStyle(deadColor);
    iterateGrid(rows, (x, y) => drawCell([x, y]));
  };

  const getDestiny = (neighborsCount, isAlive) => {
    return (isAlive && (neighborsCount === 3 || neighborsCount === 2)) ||
      (isAlive === false && neighborsCount === 3)
      ? LIVE
      : DIE;
  };

  const advanceOneGeneration = () => {
    iterateGrid(rows, (x, y) => {
      newRows[x][y] = getDestiny(
        checkNeighbors(x, y),
        newRows[x][y] === LIVE
      );
    });
    updateRows(newRows);
    updateSurvivors(rows);
  };

  const runGrid = () => {
    advanceOneGeneration();

    requestAnimationFrameId = requestAnimationFrame(runGrid);
  };

  const groupCellByStatus = (
    rowIndex,
    cellIndex,
    aliveCells,
    deadCells
  ) => {
    const cell = rows[rowIndex][cellIndex];
    const coordinate = [rowIndex, cellIndex];

    (cell === LIVE) ?
      aliveCells.push(coordinate):
      deadCells.push(coordinate);
  };

  const updateSurvivors = rows => {
    const aliveCells = [];
    const deadCells = [];

    iterateGrid(rows, (rowIndex, cellIndex) => {
      groupCellByStatus(
        rowIndex,
        cellIndex,
        aliveCells,
        deadCells
      );
    });

    setFillStyle(aliveColor);
    aliveCells.map(drawCell);

    setFillStyle(deadColor);
    deadCells.map(drawCell);
  };

  const getSurvivor = (rows, selectedSurvivor) => {
    return rows[selectedSurvivor[0]] &&
      rows[selectedSurvivor[0]][selectedSurvivor[1]]
      ? rows[selectedSurvivor[0]][selectedSurvivor[1]]
      : [];
  };

  const selectSurvivor = selectedSurvivor => {
    const survivor = getSurvivor(rows, selectedSurvivor);

    if (survivor.length === 0) return false;

    const newStatus = survivor === DIE ? LIVE : DIE;

    setRowStatus(selectedSurvivor[0], selectedSurvivor[1], newStatus);
    updateRows(newRows);
    updateSurvivors(rows);
  };

  const updateRows = newRows => rows = newRows;

  const setRowStatus = (x, y, status) => {
    newRows[x][y] = status;
    return newRows;
  };

  const getRandomColor = () => (
    "#" + Math.floor(Math.random() * 16777215).toString(16)
  );

  const setColors = colors => {
    aliveColor = colors.alive;
    deadColor = colors.dead;
  };

  return {
    init(params) {
      if (params === undefined) throw "No params specified.";

      setGridSize(params);
      createGrid(rows, newRows);
      setCanvasContext(params);
      drawGrid();
    },
    start() {
      requestAnimationFrameId = (
        requestAnimationFrame(runGrid)
      );
    },
    stop() {
      cancelAnimationFrame(requestAnimationFrameId);
    },
    reset() {
      newRows = [];
      rows = [];
      canvasContext = {}
      requestAnimationFrameId = "";
    }
  };
})();

export default Life;
