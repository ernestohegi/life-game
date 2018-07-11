const Interface = (() => {
  "use strict";

  const ID_TOKEN = "#",
    CLICK_EVENT_NAME = "click",
    MOUSEMOVE_EVENT_NAME = "mousemove",
    START_SELECTOR = ID_TOKEN + "start",
    CLEAR_SELECTOR = ID_TOKEN + "clear",
    STOP_SELECTOR = ID_TOKEN + "stop";

  return {
    init: function(params) {
      this.canvas = params.canvas;
      this.dimensions = params.dimensions;
      this.bindEvents();
    },
    clearGrid: function() {
      Life.stop();
      Life.drawGrid();
      Life.createGrid();
    },
    handleCanvasMouseOver: function(e) {
      if (e.ctrlKey || e.altKey) {
        this.handleCanvasClicked(e);
      }
    },
    handleCanvasClicked: function(e) {
      const x = e.offsetX;
      const y = e.offsetY;

      let selectedSurvivor = [];

      for (let i = 0; i < this.dimensions.x; i++) {
        for (let j = 0; j < this.dimensions.y; j++) {
          if (
            x >= i * this.dimensions.z &&
            x < (i + 1) * this.dimensions.z &&
            y >= j * this.dimensions.z &&
            y < (j + 1) * this.dimensions.z
          ) {
            selectedSurvivor = [i, j];
          }
        }
      }

      Life.selectSurvivor(selectedSurvivor);
    },
    bindEvents: function() {
      document
        .querySelector(START_SELECTOR)
        .addEventListener(CLICK_EVENT_NAME, () => Life.start());

      document
        .querySelector(STOP_SELECTOR)
        .addEventListener(CLICK_EVENT_NAME, () => Life.stop());

      document
        .querySelector(CLEAR_SELECTOR)
        .addEventListener(CLICK_EVENT_NAME, this.clearGrid);

      this.canvas.addEventListener(
        MOUSEMOVE_EVENT_NAME,
        this.handleCanvasMouseOver.bind(this)
      );

      this.canvas.addEventListener(
        CLICK_EVENT_NAME,
        this.handleCanvasClicked.bind(this)
      );
    }
  };
})();
