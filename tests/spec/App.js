describe("Game of Life", function() {
    it("should be able to get the right cell status for the next round", function() {
        var testCases = [
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

        for (var index in testCases) {
            var status = testCases[index],
                destiny = Life.getDestiny(
                    status.neighborsCount,
                    status.isAlive
                );

            expect(destiny).toEqual(status.expected);
        }
    });

    it("should be able to tell whether the current index is insde the x axis", function () {
        var testCases = [
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

        for (var index in testCases) {
            var testCase = testCases[index],
                isInsideTheXAxis = false;

            Life.setGridSize(testCase.rows, testCase.columns);

            isInsideTheXAxis = Life.isInsideTheXAxis(testCase.row, testCase.rows);

            expect(isInsideTheXAxis).toEqual(testCase.expectedResult);
        }
    });

    it("should be able to tell whether the current index is insde the y axis", function () {
        var testCases = [
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

        for (var index in testCases) {
            var testCase = testCases[index],
                isInsideTheXAxis = false;

            Life.setGridSize(testCase.columns, testCase.columns);

            isInsideTheXAxis = Life.isInsideTheYAxis(testCase.column, testCase.columns);

            expect(isInsideTheXAxis).toEqual(testCase.expectedResult);
        }
    });
});
