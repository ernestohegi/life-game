var destinyTestCases = [
    // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
    {
        neighborsCount: 1,
        isAlive: true,
        expected: 'die'
    },
    // Any live cell with two or three live neighbours lives on to the next generation.
    {
        neighborsCount: 2,
        isAlive: true,
        expected: 'live'
    },
    // Any live cell with two or three live neighbours lives on to the next generation.
    {
        neighborsCount: 3,
        isAlive: true,
        expected: 'live'
    },
    // Any live cell with more than three live neighbours dies, as if by over-population.
    {
        neighborsCount: 4,
        isAlive: true,
        expected: 'die'
    },
    // Any live cell with more than three live neighbours dies, as if by over-population.
    {
        neighborsCount: 5,
        isAlive: true,
        expected: 'die'
    },
    // Any live cell with more than three live neighbours dies, as if by over-population.
    {
        neighborsCount: 6,
        isAlive: true,
        expected: 'die'
    },
    // Any live cell with more than three live neighbours dies, as if by over-population.
    {
        neighborsCount: 7,
        isAlive: true,
        expected: 'die'
    },
    // Any live cell with more than three live neighbours dies, as if by over-population.
    {
        neighborsCount: 8,
        isAlive: true,
        expected: 'die'
    },
    // Any live cell with more than three live neighbours dies, as if by over-population.
    {
        neighborsCount: 8,
        isAlive: false,
        expected: 'die'
    },
    {
        neighborsCount: 7,
        isAlive: false,
        expected: 'die'
    },
    {
        neighborsCount: 6,
        isAlive: false,
        expected: 'die'
    },
    {
        neighborsCount: 5,
        isAlive: false,
        expected: 'die'
    },
    {
        neighborsCount: 4,
        isAlive: false,
        expected: 'die'
    },
    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    {
        neighborsCount: 3,
        isAlive: false,
        expected: 'live'
    },
    {
        neighborsCount: 2,
        isAlive: false,
        expected: 'die'
    },
    {
        neighborsCount: 1,
        isAlive: false,
        expected: 'die'
    }
];
