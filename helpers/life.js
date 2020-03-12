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

  return {
    init(params) {
      if (params === undefined) throw "No params specified.";

      this.setUpGrid(params);
      this.createGrid();
      this.drawGrid();
    },
    setUpGrid(params) {
      this.setGridSize(params);
      this.setCanvasContext(params);
    },
    setGridSize(params) {
      dimensions = params.dimensions;
    },
    setCanvasContext(params) {
      canvasContext = params.canvas.getContext("2d");
    },
    iterateGrid(grid = [], callback) {
      grid.map((rows, rowIndex) => {
        rows.map((cell, cellIndex) => {
          callback(rowIndex, cellIndex);
        });
      });
    },
    createGrid() {
      let i, j;

      rows = [];
      newRows = [];

      for (i = 0; i < dimensions.x; ++i) {
        rows.push([]);
        newRows.push([]);

        for (j = 0; j < dimensions.y; ++j) {
          rows[i].push(DIE);
          newRows[i].push(DIE);
        }
      }
    },
    drawGrid() {
      canvasContext.fillStyle = deadColor;

      const drawGrid = (rowIndex, cellIndex) => {
        canvasContext.fillRect(
          rowIndex * dimensions.z,
          cellIndex * dimensions.z,
          dimensions.z,
          dimensions.z
        );
      };

      this.iterateGrid(rows, drawGrid);
    },
    advanceOneGeneration() {
      this.iterateGrid(rows, this.checkNeighbors.bind(this));

      this.updateRows(newRows);
      this.updateSurvivors(rows);
    },
    runGrid() {
      this.advanceOneGeneration();

      requestAnimationFrameId = requestAnimationFrame(this.runGrid.bind(this));
    },
    checkNeighbors(x, y) {
      let neighborsCount = 0,
        i,
        j;

      for (i = x - 1; i <= x + 1; ++i) {
        if (this.isInsideTheXAxis(i, x)) {
          for (j = y - 1; j <= y + 1; ++j) {
            if (
              this.isNotItself(x, y, i, j) &&
              this.isInsideTheYAxis(j, y) &&
              this.isNeighborAlive(i, j)
            ) {
              ++neighborsCount;
            }
          }
        }
      }

      newRows[x][y] = this.getDestiny(neighborsCount, newRows[x][y] === LIVE);

      return newRows;
    },
    getDestiny(neighborsCount, isAlive) {
      return (isAlive && (neighborsCount === 3 || neighborsCount === 2)) ||
        (isAlive === false && neighborsCount === 3)
        ? LIVE
        : DIE;
    },
    isNotItself(x, y, i, j) {
      return (x === i && y === j) === false;
    },
    isInsideTheXAxis(index, x) {
      return this.isInsideTheCoordinates(index, x, dimensions.x);
    },
    isInsideTheYAxis(index, y) {
      return this.isInsideTheCoordinates(index, y, dimensions.y);
    },
    isInsideTheCoordinates(coordinate, position, gridCoordinate) {
      return (
        coordinate !== undefined &&
        position !== undefined &&
        coordinate > -1 &&
        coordinate <= gridCoordinate
      );
    },
    isNeighborAlive(x, y) {
      return (
        newRows[x] !== undefined &&
        newRows[x][y] !== undefined &&
        newRows[x][y] === LIVE
      );
    },
    groupCellByStatus(rowIndex, cellIndex, aliveCells, deadCells) {
      const cell = rows[rowIndex][cellIndex];
      const coordinate = [rowIndex, cellIndex];

      (cell === LIVE) ?
        aliveCells.push(coordinate):
        deadCells.push(coordinate);
    },
    drawCells(cell) {
      const zDimension = dimensions.z;

      canvasContext.fillRect(
        cell[0] * zDimension,
        cell[1] * zDimension,
        zDimension,
        zDimension
      );
    },
    updateSurvivors(rows) {
      const aliveCells = [];
      const deadCells = [];

      this.iterateGrid(rows, (rowIndex, cellIndex) => {
        this.groupCellByStatus(
          rowIndex,
          cellIndex,
          aliveCells,
          deadCells
        );
      });

      canvasContext.fillStyle = aliveColor;
      aliveCells.map(this.drawCells.bind(this));

      canvasContext.fillStyle = deadColor;
      deadCells.map(this.drawCells.bind(this));
    },
    getSurvivor(selectedSurvivor) {
      return rows[selectedSurvivor[0]] &&
        rows[selectedSurvivor[0]][selectedSurvivor[1]]
        ? rows[selectedSurvivor[0]][selectedSurvivor[1]]
        : [];
    },
    selectSurvivor(selectedSurvivor, status) {
      const survivor = this.getSurvivor(selectedSurvivor);
      let newStatus;

      if (survivor.length === 0) return false;

      if (status) {
        newStatus = status
      } else {
        newStatus = survivor === DIE ? LIVE : DIE;
      }

      this.setRowStatus(selectedSurvivor[0], selectedSurvivor[1], newStatus);
      this.updateRows(newRows);
      this.updateSurvivors(rows);
    },
    updateRows(newRows) {
      rows = newRows;
    },
    setRowStatus(x, y, status) {
      newRows[x][y] = status;

      return newRows;
    },
    getRandomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },
    setColors(colors) {
      aliveColor = colors.alive;
      deadColor = colors.dead;
    },
    start() {
      requestAnimationFrameId = requestAnimationFrame(this.runGrid.bind(this));
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
