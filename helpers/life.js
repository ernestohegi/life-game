const Life = (() => {
  const LIVE = "live";
  const DIE = "die";

  let aliveColor = "#FC6336";
  let deadColor = "#5F4B8B";

  let requestAnimationFrameId = "",
    newRows = [],
    rows = [],
    dimensions = { x: 0, y: 0, z: 0 },
    canvasContext = {};

  const setUpGrid = params => {
    setGridSize(params);
    setCanvasContext(params);
  };

  const setGridSize = params => {
    dimensions = params.dimensions;
  };

  const setCanvasContext = params => {
    canvasContext = params.canvas.getContext("2d");
  };

  const iterateGrid = (grid = [], callback) => {
    grid.map((rows, rowIndex) => {
      rows.map((cell, cellIndex) => {
        callback(rowIndex, cellIndex);
      });
    });
  };

  const createGrid = (rows = [], newRows = []) => {
    let i, j;

    for (i = 0; i < dimensions.x; ++i) {
      rows.push([]);
      newRows.push([]);

      for (j = 0; j < dimensions.y; ++j) {
        rows[i].push(DIE);
        newRows[i].push(DIE);
      }
    }
  };

  const drawCell = cell => {
    const zDimension = dimensions.z;

    canvasContext.fillRect(
      cell[0] * zDimension,
      cell[1] * zDimension,
      zDimension,
      zDimension
    );
  };

  const drawGrid = () => {
    canvasContext.fillStyle = deadColor;
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
      this.groupCellByStatus(
        rowIndex,
        cellIndex,
        aliveCells,
        deadCells
      );
    });

    canvasContext.fillStyle = aliveColor;
    aliveCells.map(drawCell);

    canvasContext.fillStyle = deadColor;
    deadCells.map(drawCell);
  };

  const getSurvivor = selectedSurvivor => {
    return rows[selectedSurvivor[0]] &&
      rows[selectedSurvivor[0]][selectedSurvivor[1]]
      ? rows[selectedSurvivor[0]][selectedSurvivor[1]]
      : [];
  };

  const selectSurvivor = selectedSurvivor => {
    const survivor = getSurvivor(selectedSurvivor);

    if (survivor.length === 0) return false;

    const newStatus = survivor === DIE ? LIVE : DIE;

    setRowStatus(selectedSurvivor[0], selectedSurvivor[1], newStatus);
    updateRows(newRows);
    updateSurvivors(rows);
  };

  const updateRows = newRows => {
    rows = newRows;
  };

  const setRowStatus = (x, y, status) => {
    newRows[x][y] = status;
    return newRows;
  };

  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const setColors = colors => {
    aliveColor = colors.alive;
    deadColor = colors.dead;
  };

  return {
    init(params) {
      if (params === undefined) throw "No params specified.";

      setUpGrid(params);
      createGrid(rows, newRows);
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
