let Interface = ($ => {
  "use strict";

  const ID_TOKEN = "#",
    CLASS_TOKEN = ".",
    CLICK_EVENT_NAME = "click",
    MOUSEMOVE_EVENT_NAME = "mousemove",
    MENU_SELECTOR = ID_TOKEN + "menu",
    START_SELECTOR = ID_TOKEN + "start",
    CLEAR_SELECTOR = ID_TOKEN + "clear",
    COLORIZE_SELECTOR = ID_TOKEN + "colorize",
    STOP_SELECTOR = ID_TOKEN + "stop";

  return {
    colors: false,
    init: function(params) {
      this.$container = params.container;
      this.$mainElement = $(MENU_SELECTOR);
      this.canvas = params.canvas;
      this.x = params.x;
      this.y = params.y;
      this.z = params.z;
      this.bindEvents();
    },
    clearGrid: function() {
      Life.stop();
      Life.drawGrid();
      Life.createGrid();
    },
    colorizeGrid: function() {
      let colors = !this.colors;

      Life.updateSettings({
        colors
      });

      this.colors = colors;
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

      for (let i = 0; i < this.x; i++) {
        for (let j = 0; j < this.y; j++) {
          if (
            x >= i * this.z &&
            x < (i + 1) * this.z &&
            y >= j * this.z &&
            y < (j + 1) * this.z
          ) {
            selectedSurvivor = [i, j];
          }
        }
      }

      Life.selectSurvivor(selectedSurvivor);
    },
    bindEvents: function() {
      this.$mainElement.on(CLICK_EVENT_NAME, START_SELECTOR, () =>
        Life.start()
      );

      this.$mainElement.on(CLICK_EVENT_NAME, STOP_SELECTOR, () => Life.stop());

      this.$mainElement.on(CLICK_EVENT_NAME, CLEAR_SELECTOR, this.clearGrid);

      this.$mainElement.on(
        CLICK_EVENT_NAME,
        COLORIZE_SELECTOR,
        this.colorizeGrid
      );

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
})(jQuery);
