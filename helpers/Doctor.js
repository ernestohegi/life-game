export const checkNeighbors = (x, y) => {
  let neighborsCount = 0,
    i,
    j;

  for (i = x - 1; i <= x + 1; ++i) {
    if (isInsideTheXAxis(i, x)) {
      for (j = y - 1; j <= y + 1; ++j) {
        if (
          isNotItself(x, y, i, j) &&
          isInsideTheYAxis(j, y) &&
          isNeighborAlive(i, j)
        ) {
          ++neighborsCount;
        }
      }
    }
  }

  return neighborsCount;
};

export const isNotItself = (x, y, i, j) => {
  return (x === i && y === j) === false;
};

export const isInsideTheXAxis = (index, x) => {
  return isInsideTheCoordinates(index, x, dimensions.x);
};

export const isInsideTheYAxis = (index, y) => {
  return isInsideTheCoordinates(index, y, dimensions.y);
};

export const isInsideTheCoordinates = (coordinate, position, gridCoordinate) => {
  return (
    coordinate !== undefined &&
    position !== undefined &&
    coordinate > -1 &&
    coordinate <= gridCoordinate
  );
};

export const isNeighborAlive = (x, y) => {
  return (
    newRows[x] !== undefined &&
    newRows[x][y] !== undefined &&
    newRows[x][y] === LIVE
  );
};

