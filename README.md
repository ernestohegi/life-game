# Game of Life

https://life-game.now.sh

## Work in Progress

JavaScript version of the Game of Life.

1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by over-population.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

http://en.wikipedia.org/wiki/Conway's_Game_of_Life

### Technologies
- JavaScript
- React
- Reflux
- CSS
- HTML
- Gulp
- Karma
- PhantomJS

### Installation

- Clone the repository.
- `npm install` and `bower install`.
- `npm run build`.

###Tests

Karma and PhantomJS must be installed before running the tests.
Tests can be run executing the following command `karma start karma.conf.js`.
