import {
  isInsideTheXAxis,
  isInsideTheYAxis,
  getDestiny,
  getNextGeneration,
  createLogicalMatrix,
  ACTIVE_STATUS,
  INACTIVE_STATUS,
} from "./utils";

const destinyTestCases = [
  // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
  {
    neighborsCount: 1,
    isAlive: true,
    expected: INACTIVE_STATUS,
  },
  // Any live cell with two or three live neighbours lives on to the next generation.
  {
    neighborsCount: 2,
    isAlive: true,
    expected: ACTIVE_STATUS,
  },
  // Any live cell with two or three live neighbours lives on to the next generation.
  {
    neighborsCount: 3,
    isAlive: true,
    expected: ACTIVE_STATUS,
  },
  // Any live cell with more than three live neighbours dies, as if by over-population.
  {
    neighborsCount: 4,
    isAlive: true,
    expected: INACTIVE_STATUS,
  },
  // Any live cell with more than three live neighbours dies, as if by over-population.
  {
    neighborsCount: 5,
    isAlive: true,
    expected: INACTIVE_STATUS,
  },
  // Any live cell with more than three live neighbours dies, as if by over-population.
  {
    neighborsCount: 6,
    isAlive: true,
    expected: INACTIVE_STATUS,
  },
  // Any live cell with more than three live neighbours dies, as if by over-population.
  {
    neighborsCount: 7,
    isAlive: true,
    expected: INACTIVE_STATUS,
  },
  // Any live cell with more than three live neighbours dies, as if by over-population.
  {
    neighborsCount: 8,
    isAlive: true,
    expected: INACTIVE_STATUS,
  },
  // Any live cell with more than three live neighbours dies, as if by over-population.
  {
    neighborsCount: 8,
    isAlive: false,
    expected: INACTIVE_STATUS,
  },
  {
    neighborsCount: 7,
    isAlive: false,
    expected: INACTIVE_STATUS,
  },
  {
    neighborsCount: 6,
    isAlive: false,
    expected: INACTIVE_STATUS,
  },
  {
    neighborsCount: 5,
    isAlive: false,
    expected: INACTIVE_STATUS,
  },
  {
    neighborsCount: 4,
    isAlive: false,
    expected: INACTIVE_STATUS,
  },
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  {
    neighborsCount: 3,
    isAlive: false,
    expected: ACTIVE_STATUS,
  },
  {
    neighborsCount: 2,
    isAlive: false,
    expected: INACTIVE_STATUS,
  },
  {
    neighborsCount: 1,
    isAlive: false,
    expected: INACTIVE_STATUS,
  },
];

const xAxisTestCases = [
  {
    rows: 0,
    columns: 0,
    row: 0,
    expectedResult: false,
  },
  {
    rows: 1,
    columns: 0,
    row: 0,
    expectedResult: true,
  },
  {
    rows: 1,
    columns: 0,
    row: 1,
    expectedResult: false,
  },
  {
    rows: 1,
    columns: 0,
    row: 2,
    expectedResult: false,
  },
  {
    rows: 1,
    columns: 0,
    row: -1,
    expectedResult: false,
  },
];

const yAxisTestCases = [
  {
    rows: 0,
    columns: 0,
    column: 0,
    expectedResult: false,
  },
  {
    rows: 0,
    columns: 1,
    column: 0,
    expectedResult: true,
  },
  {
    rows: 0,
    columns: 1,
    column: 1,
    expectedResult: false,
  },
  {
    rows: 0,
    columns: 1,
    column: 2,
    expectedResult: false,
  },
  {
    rows: 0,
    columns: 1,
    column: -1,
    expectedResult: false,
  },
];

describe("Game of Life", () => {
  it("should be able to get the right cell status for the next round", () => {
    Object.values(destinyTestCases).map((destinyTestCase) => {
      const destiny = getDestiny(
        destinyTestCase.neighborsCount,
        destinyTestCase.isAlive
      );

      expect(destiny).toEqual(destinyTestCase.expected);
    });
  });

  it("should be able to tell whether the current index is insde the x axis", () => {
    Object.values(xAxisTestCases).map((xAxisTestCase) => {
      const { row, rows, columns, expectedResult } = xAxisTestCase;

      const dimensions = {
        rows,
        columns,
      };

      expect(isInsideTheXAxis(row, dimensions)).toEqual(expectedResult);
    });
  });

  it("should be able to tell whether the current index is insde the y axis", () => {
    Object.values(yAxisTestCases).map((yAxisTestCase) => {
      const { column, rows, columns, expectedResult } = yAxisTestCase;

      const dimensions = {
        rows,
        columns,
      };

      expect(isInsideTheYAxis(column, dimensions)).toEqual(expectedResult);
    });
  });

  it("should be able to tell whether a cell survives the next generation", () => {
    const dimensions = {
      rows: 3,
      columns: 3,
    };

    const { rows } = createLogicalMatrix(dimensions);

    const newRows = JSON.parse(JSON.stringify(rows));

    rows[0][0] = INACTIVE_STATUS;
    rows[0][1] = ACTIVE_STATUS;
    rows[0][2] = INACTIVE_STATUS;
    rows[1][0] = ACTIVE_STATUS;
    rows[1][1] = ACTIVE_STATUS;
    rows[1][2] = ACTIVE_STATUS;
    rows[2][0] = INACTIVE_STATUS;
    rows[2][1] = ACTIVE_STATUS;
    rows[2][2] = INACTIVE_STATUS;

    expect(getNextGeneration(0, 0, dimensions, rows, newRows)).toEqual(
      ACTIVE_STATUS
    );
    expect(getNextGeneration(0, 1, dimensions, rows, newRows)).toEqual(
      ACTIVE_STATUS
    );
    expect(getNextGeneration(0, 2, dimensions, rows, newRows)).toEqual(
      ACTIVE_STATUS
    );
    expect(getNextGeneration(1, 0, dimensions, rows, newRows)).toEqual(
      ACTIVE_STATUS
    );
    expect(getNextGeneration(1, 1, dimensions, rows, newRows)).toEqual(
      INACTIVE_STATUS
    );
    expect(getNextGeneration(1, 2, dimensions, rows, newRows)).toEqual(
      ACTIVE_STATUS
    );
    expect(getNextGeneration(2, 0, dimensions, rows, newRows)).toEqual(
      ACTIVE_STATUS
    );
    expect(getNextGeneration(2, 1, dimensions, rows, newRows)).toEqual(
      ACTIVE_STATUS
    );
    expect(getNextGeneration(2, 2, dimensions, rows, newRows)).toEqual(
      ACTIVE_STATUS
    );
  });
});
