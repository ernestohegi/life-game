import {
  getDestiny,
  getNextGeneration,
  createLogicalMatrix,
  ACTIVE_STATUS,
  INACTIVE_STATUS,
} from './utils';

const destinyTestCases = [
  // Any live cell with fewer than two live neighbors dies (under-population)
  {
    neighborsCount: 1,
    isAlive: true,
    expected: INACTIVE_STATUS,
    description: 'Live cell with 1 neighbor dies',
  },

  // Any live cell with two or three live neighbors survives
  {
    neighborsCount: 2,
    isAlive: true,
    expected: ACTIVE_STATUS,
    description: 'Live cell with 2 neighbors survives',
  },
  {
    neighborsCount: 3,
    isAlive: true,
    expected: ACTIVE_STATUS,
    description: 'Live cell with 3 neighbors survives',
  },

  // Any live cell with more than three live neighbors dies (over-population)
  {
    neighborsCount: 4,
    isAlive: true,
    expected: INACTIVE_STATUS,
    description: 'Live cell with 4 neighbors dies',
  },
  {
    neighborsCount: 8,
    isAlive: true,
    expected: INACTIVE_STATUS,
    description: 'Live cell with 8 neighbors dies',
  },

  // Any dead cell with exactly three live neighbors becomes alive (reproduction)
  {
    neighborsCount: 3,
    isAlive: false,
    expected: ACTIVE_STATUS,
    description: 'Dead cell with 3 neighbors becomes alive',
  },

  // Dead cells with any other number of neighbors stay dead
  {
    neighborsCount: 2,
    isAlive: false,
    expected: INACTIVE_STATUS,
    description: 'Dead cell with 2 neighbors stays dead',
  },
  {
    neighborsCount: 8,
    isAlive: false,
    expected: INACTIVE_STATUS,
    description: 'Dead cell with 8 neighbors stays dead',
  },
];

describe('Game of Life', () => {
  describe('getDestiny', () => {
    it('correctly determines cell status for the next generation', () => {
      destinyTestCases.forEach((testCase) => {
        const destiny = getDestiny(testCase.neighborsCount, testCase.isAlive);
        expect(destiny).toEqual(testCase.expected);
      });
    });
  });

  describe('getNextGeneration', () => {
    it('correctly calculates the next generation state for each cell', () => {
      // Setup a 3x3 grid with a specific pattern
      // [0,1,0]
      // [1,1,1]
      // [0,1,0]
      const dimensions = { rows: 3, columns: 3 };
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

      // Test each cell's next state
      expect(getNextGeneration(0, 0, dimensions, rows, newRows)).toEqual(ACTIVE_STATUS);
      expect(getNextGeneration(0, 1, dimensions, rows, newRows)).toEqual(ACTIVE_STATUS);
      expect(getNextGeneration(0, 2, dimensions, rows, newRows)).toEqual(ACTIVE_STATUS);
      expect(getNextGeneration(1, 0, dimensions, rows, newRows)).toEqual(ACTIVE_STATUS);
      expect(getNextGeneration(1, 1, dimensions, rows, newRows)).toEqual(INACTIVE_STATUS);
      expect(getNextGeneration(1, 2, dimensions, rows, newRows)).toEqual(ACTIVE_STATUS);
      expect(getNextGeneration(2, 0, dimensions, rows, newRows)).toEqual(ACTIVE_STATUS);
      expect(getNextGeneration(2, 1, dimensions, rows, newRows)).toEqual(ACTIVE_STATUS);
      expect(getNextGeneration(2, 2, dimensions, rows, newRows)).toEqual(ACTIVE_STATUS);
    });
  });
});
