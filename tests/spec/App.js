describe("Life Game", function() {
  var life = new window.Life();

  it("should be able to get the right cell status for the next round", function() {
    var testCases = [
      {
        neighborsCount  : 1,
        isAlive         : true,
        expected        : 'die'
      },
      {
        neighborsCount  : 2,
        isAlive         : true,
        expected        : 'live'
      },
      {
        neighborsCount  : 3,
        isAlive         : true,
        expected        : 'live'
      },
      {
        neighborsCount  : 4,
        isAlive         : true,
        expected        : 'die'
      },
      {
        neighborsCount  : 4,
        isAlive         : false,
        expected        : 'die'
      },
      {
        neighborsCount  : 3,
        isAlive         : false,
        expected        : 'live'
      },
      {
        neighborsCount  : 2,
        isAlive         : false,
        expected        : 'die'
      }
    ];

    for (var index in testCases) {
      var testCase = testCases[index];

      expect(life.getDestiny(testCase.neighborsCount, testCase.isAlive)).toEqual(testCase.expected);
    }
  });
});
