const canvasContext = {};

export const setCanvasContext = params => {
  canvasContext = params.canvas.getContext("2d");
};

export const drawCell = cell => {
  const zDimension = dimensions.z;

  canvasContext.fillRect(
    cell[0] * zDimension,
    cell[1] * zDimension,
    zDimension,
    zDimension
  );
};

export const setFillStyle = color => canvasContext.fillStyle = color;
