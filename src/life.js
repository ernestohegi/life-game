const Life = (() => {
  "use strict";

  const LIVE = "live",
    DIE = "die",
    ALIVE_COLOR = "#000",
    DEAD_COLOR = "#FFF";

  let requestAnimationFrameId = "",
    newRows = [],
    rows = [],
    dimensions = { x: 0, y: 0, z: 0 },
    canvasContext = {};

  return {
    init: function(params) {
      if (params === undefined) throw "No params specified.";

      this.setUpGrid(params);
      this.createGrid();
      this.drawGrid();
    },
    setUpGrid: function(params) {
      dimensions = params.dimensions;
      canvasContext = params.canvas.getContext("2d");
    },
    createGrid: function() {
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
    drawGrid: function() {
      for (let x = 0; x < dimensions.x; x++) {
        for (let y = 0; y < dimensions.y; y++) {
          canvasContext.fillStyle = DEAD_COLOR;

          canvasContext.fillRect(
            x * dimensions.z,
            y * dimensions.z,
            dimensions.z,
            dimensions.z
          );
        }
      }
    },
    runGrid: function() {
      for (let i = 0; i < dimensions.x; ++i) {
        for (let j = 0; j < dimensions.y; ++j) {
          this.checkNeighbors(i, j);
        }
      }

      this.updateRows(newRows);
      this.updateSurvivors(rows);

      requestAnimationFrameId = requestAnimationFrame(this.runGrid.bind(this));
    },
    checkNeighbors: function(x, y) {
      let neighborsCount = 0,
        i,
        j;

      let newRows = rows;

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
    getDestiny: function(neighborsCount, isAlive) {
      return (isAlive && (neighborsCount === 3 || neighborsCount === 2)) ||
        (isAlive === false && neighborsCount === 3)
        ? LIVE
        : DIE;
    },
    isNotItself: function(x, y, i, j) {
      return (x === i && y === j) === false;
    },
    isInsideTheXAxis: function(index, x) {
      return this.isInsideTheCoordinates(index, x, dimensions.x);
    },
    isInsideTheYAxis: function(index, y) {
      return this.isInsideTheCoordinates(index, y, dimensions.y);
    },
    isInsideTheCoordinates: function(coordinate, position, gridCoordinate) {
      return (
        coordinate !== undefined &&
        position !== undefined &&
        coordinate > -1 &&
        coordinate <= gridCoordinate
      );
    },
    isNeighborAlive: function(x, y) {
      return (
        newRows[x] !== undefined &&
        newRows[x][y] !== undefined &&
        newRows[x][y] === LIVE
      );
    },
    updateSurvivors: function(rows) {
      for (let x = 0; x < dimensions.x; x++) {
        for (let y = 0; y < dimensions.y; y++) {
          let thisRowStatus = rows[x][y];

          canvasContext.fillStyle =
            thisRowStatus === LIVE ? ALIVE_COLOR : DEAD_COLOR;

          canvasContext.fillRect(
            x * dimensions.z,
            y * dimensions.z,
            dimensions.z,
            dimensions.z
          );
        }
      }
    },
    selectSurvivor: function(selectedSurvivor) {
      const newStatus =
        rows[selectedSurvivor[0]][selectedSurvivor[1]] === DIE ? LIVE : DIE;

      this.setRowStatus(selectedSurvivor[0], selectedSurvivor[1], newStatus);
      this.updateRows(newRows);
      this.updateSurvivors(rows);
    },
    updateRows: function(newRows) {
      rows = newRows;
    },
    setRowStatus: function(x, y, status) {
      newRows[x][y] = status;

      return newRows;
    },
    getRandomColor: function() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },
    start: function() {
      requestAnimationFrameId = requestAnimationFrame(this.runGrid.bind(this));
    },
    stop: function() {
      cancelAnimationFrame(requestAnimationFrameId);
    }
  };
})();
