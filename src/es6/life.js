let Life = (function($) {
  "use strict";

  const BACKGROUND_COLOR_PROPERTY = "background-color",
    DATA_STATUS_ATTRIBUTE = "data-status",
    SELECTED_CLASS_NAME = "selected",
    LIVE = "live",
    DIE = "die",
    ALIVE_COLOR = "#000",
    DEAD_COLOR = "#FFF";

  let requestAnimationFrameId = "",
    colors = false,
    newRows = [],
    rows = [],
    speed = 0,
    gridSize = {},
    canvasContext = {};

  return {
    init: function(params) {
      if (params === undefined) throw "No params specified.";

      this.setUpGrid(params.x, params.y, params.z, params.canvas);
      this.createGrid();
      this.drawGrid();
      this.updateSettings(params);
    },
    setUpGrid: function(x, y, z, canvas) {
      gridSize.x = x;
      gridSize.y = y;
      gridSize.z = z;

      canvasContext = canvas.getContext("2d");
    },
    createGrid: function() {
      let i, j;

      rows = [];
      newRows = [];

      for (i = 0; i < gridSize.x; ++i) {
        rows.push([]);
        newRows.push([]);

        for (j = 0; j < gridSize.y; ++j) {
          rows[i].push(DIE);
          newRows[i].push(DIE);
        }
      }
    },
    drawGrid: function() {
      for (let x = 0; x < gridSize.x; x++) {
        for (let y = 0; y < gridSize.y; y++) {
          canvasContext.fillStyle = DEAD_COLOR;

          canvasContext.fillRect(
            x * gridSize.z,
            y * gridSize.z,
            gridSize.z,
            gridSize.z
          );
        }
      }
    },
    runGrid: function() {
      console.log("running grid");

      for (let i = 0; i < gridSize.x; ++i) {
        for (let j = 0; j < gridSize.y; ++j) {
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
      return this.isInsideTheCoordinates(index, x, gridSize.x);
    },
    isInsideTheYAxis: function(index, y) {
      return this.isInsideTheCoordinates(index, y, gridSize.y);
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
      for (let x = 0; x < gridSize.x; x++) {
        for (let y = 0; y < gridSize.y; y++) {
          let thisRowStatus = rows[x][y];

          canvasContext.fillStyle =
            thisRowStatus === LIVE ? ALIVE_COLOR : DEAD_COLOR;

          canvasContext.fillRect(
            x * gridSize.z,
            y * gridSize.z,
            gridSize.z,
            gridSize.z
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
    updateRows: function (newRows) {
        rows = newRows;
    },
    setRowStatus: function(x, y, status) {
      newRows[x][y] = status;

      return newRows;
    },
    updateSettings: function(params) {
      if (params !== undefined) {
        if (params.speed !== undefined) {
          speed = params.speed;
        }

        if (params.colors !== undefined) {
          colors = params.colors;
        }
      }
    },
    getRandomColor: function() {
      // canvasContext.fillStyle = `
      //   rgb(
      //     ${Math.floor(255 - 42.5 * x)},
      //     ${Math.floor(255 - 42.5 * y)},
      //     0
      //   )
      // `;

      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },
    start: function() {
      requestAnimationFrameId = requestAnimationFrame(this.runGrid.bind(this));
    },
    stop: function() {
      cancelAnimationFrame(requestAnimationFrameId);
    }
  };
})(jQuery);
