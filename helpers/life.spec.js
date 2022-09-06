import {
  isInsideTheXAxis,
  isInsideTheYAxis,
  getDestiny,
  setRowStatus,
  checkNeighbors,
  setupGrid,
  createGrid,
} from "./life";

const destinyTestCases = [
  // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
  {
    neighborsCount: 1,
    isAlive: true,
    expected: "die",
  },
  // Any live cell with two or three live neighbours lives on to the next generation.
  {
    neighborsCount: 2,
    isAlive: true,
    expected: "live",
  },
  // Any live cell with two or three live neighbours lives on to the next generation.
  {
    neighborsCount: 3,
    isAlive: true,
    expected: "live",
  },
  // Any live cell with more than three live neighbours dies, as if by over-population.
  {
    neighborsCount: 4,
    isAlive: true,
    expected: "die",
  },
  // Any live cell with more than three live neighbours dies, as if by over-population.
  {
    neighborsCount: 5,
    isAlive: true,
    expected: "die",
  },
  // Any live cell with more than three live neighbours dies, as if by over-population.
  {
    neighborsCount: 6,
    isAlive: true,
    expected: "die",
  },
  // Any live cell with more than three live neighbours dies, as if by over-population.
  {
    neighborsCount: 7,
    isAlive: true,
    expected: "die",
  },
  // Any live cell with more than three live neighbours dies, as if by over-population.
  {
    neighborsCount: 8,
    isAlive: true,
    expected: "die",
  },
  // Any live cell with more than three live neighbours dies, as if by over-population.
  {
    neighborsCount: 8,
    isAlive: false,
    expected: "die",
  },
  {
    neighborsCount: 7,
    isAlive: false,
    expected: "die",
  },
  {
    neighborsCount: 6,
    isAlive: false,
    expected: "die",
  },
  {
    neighborsCount: 5,
    isAlive: false,
    expected: "die",
  },
  {
    neighborsCount: 4,
    isAlive: false,
    expected: "die",
  },
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  {
    neighborsCount: 3,
    isAlive: false,
    expected: "live",
  },
  {
    neighborsCount: 2,
    isAlive: false,
    expected: "die",
  },
  {
    neighborsCount: 1,
    isAlive: false,
    expected: "die",
  },
];

const xAxisTestCases = [
  {
    rows: 0,
    columns: 0,
    row: 0,
    expectedResult: true,
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
    expectedResult: true,
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
    expectedResult: true,
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
    expectedResult: true,
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
    for (const index in destinyTestCases) {
      const status = destinyTestCases[index];
      const destiny = getDestiny(status.neighborsCount, status.isAlive);

      expect(destiny).toEqual(status.expected);
    }
  });

  it("should be able to tell whether the current index is insde the x axis", () => {
    for (const index in xAxisTestCases) {
      const testCase = xAxisTestCases[index];

      setupGrid({
        dimensions: {
          x: testCase.rows,
          y: testCase.columns,
        },
      });

      expect(isInsideTheXAxis(testCase.row, testCase.rows)).toEqual(
        testCase.expectedResult
      );
    }
  });

  it("should be able to tell whether the current index is insde the y axis", () => {
    for (const index in yAxisTestCases) {
      const testCase = yAxisTestCases[index];

      setupGrid({
        dimensions: {
          x: testCase.columns,
          y: testCase.columns,
        },
      });

      expect(isInsideTheYAxis(testCase.column, testCase.columns)).toEqual(
        testCase.expectedResult
      );
    }
  });

  it("should be able to tell whether a cell lives or die the next generation", () => {
    // Lives
    let checkedNeighbors;

    setupGrid({
      dimensions: {
        x: 3,
        y: 3,
      },
    });

    createGrid();

    setRowStatus(0, 0, "live");
    setRowStatus(0, 1, "live");
    setRowStatus(1, 1, "live");

    checkedNeighbors = checkNeighbors(1, 1);

    expect(checkedNeighbors[1][1]).toEqual("live");

    // Dies
    setupGrid({
      dimensions: {
        x: 3,
        y: 3,
      },
    });

    createGrid();

    setRowStatus(1, 1, "live");

    checkedNeighbors = checkNeighbors(1, 1);

    expect(checkedNeighbors[1][1]).toEqual("die");
  });
});
