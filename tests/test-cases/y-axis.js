var yAxisTestCases = [
    {
        rows: 0,
        columns: 0,
        column: 0,
        expectedResult: true
    },
    {
        rows: 0,
        columns: 1,
        column: 0,
        expectedResult: true
    },
    {
        rows: 0,
        columns: 1,
        column: 1,
        expectedResult: true
    },
    {
        rows: 0,
        columns: 1,
        column: 2,
        expectedResult: false
    },
    {
        rows: 0,
        columns: 1,
        column: -1,
        expectedResult: false
    }
];
