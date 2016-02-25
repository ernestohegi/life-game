var xAxisTestCases = [
    {
        rows: 0,
        columns: 0,
        row: 0,
        expectedResult: true
    },
    {
        rows: 1,
        columns: 0,
        row: 0,
        expectedResult: true
    },
    {
        rows: 1,
        columns: 0,
        row: 1,
        expectedResult: true
    },
    {
        rows: 1,
        columns: 0,
        row: 2,
        expectedResult: false
    },
    {
        rows: 1,
        columns: 0,
        row: -1,
        expectedResult: false
    }
];
