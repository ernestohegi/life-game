describe("Game of Life", function() {
    it("should be able to get the right cell status for the next round", function() {
        for (var index in destinyTestCases) {
            var status = destinyTestCases[index],
                destiny = Life.getDestiny(
                    status.neighborsCount,
                    status.isAlive
                );

            expect(destiny).toEqual(status.expected);
        }
    });

    it("should be able to tell whether the current index is insde the x axis", function () {
        for (var index in xAxisTestCases) {
            var testCase = xAxisTestCases[index],
                isInsideTheXAxis = false;

            Life.setGridSize(testCase.rows, testCase.columns);

            isInsideTheXAxis = Life.isInsideTheXAxis(testCase.row, testCase.rows);

            expect(isInsideTheXAxis).toEqual(testCase.expectedResult);
        }
    });

    it("should be able to tell whether the current index is insde the y axis", function () {
        for (var index in yAxisTestCases) {
            var testCase = yAxisTestCases[index],
                isInsideTheXAxis = false;

            Life.setGridSize(testCase.columns, testCase.columns);

            isInsideTheXAxis = Life.isInsideTheYAxis(testCase.column, testCase.columns);

            expect(isInsideTheXAxis).toEqual(testCase.expectedResult);
        }
    });

    it("should be able to tell whether a cell lives or die the next generation", function () {
        // Lives
        var checkedNeighbors;

        Life.setGridSize(3, 3);
        Life.createGrid();

        Life.setRowStatus(0, 1, 'live')
        Life.setRowStatus(0, 0, 'live')
        Life.setRowStatus(1, 1, 'live')

        checkedNeighbors = Life.checkNeighbors(1, 1);

        expect(checkedNeighbors[1][1]).toEqual('live');

        // Dies
        Life.setGridSize(3, 3);
        Life.createGrid();

        Life.setRowStatus(1, 1, 'live')

        checkedNeighbors = Life.checkNeighbors(1, 1);

        expect(checkedNeighbors[1][1]).toEqual('die');
    });
});
