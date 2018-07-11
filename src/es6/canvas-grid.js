const SQUARE = 50;
const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

for (let x = 0; x < GRID_WIDTH; x++) {
    for (let y = 0; y < GRID_HEIGHT; y++) {
        ctx.fillStyle = `
          rgb(
            ${Math.floor(255 - 42.5 * x)},
            ${Math.floor(255 - 42.5 * y)},
            0
          )
        `;

        ctx.fillRect(
          x * SQUARE,
          y * SQUARE,
          SQUARE,
          SQUARE
        );
    }
}
