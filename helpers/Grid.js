export const setGridSize = params => {
  dimensions = params.dimensions;
};

export const iterateGrid = (grid = [], callback) => {
  grid.map((rows, rowIndex) => {
    rows.map((cell, cellIndex) => {
      callback(rowIndex, cellIndex);
    });
  });
};

export const createGrid = (rows = [], newRows = []) => {
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
