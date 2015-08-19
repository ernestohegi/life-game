(function ($) {
  var Canvas = function () {
    this.main = {};
    this.context = {};
  };

  Canvas.prototype = {
    init: function () {
      this.main = document.getElementById("canvas");

      if (this.main.getContext) {
        this.context = this.main.getContext("2d");
      }
    },
    draw: function (params) {
      if (params !== undefined) {
        var top = params.top,
            left = params.left,
            width = params.width,
            height = params.height,
            color = params.color;

        this.context.fillStyle = color;
        this.context.fillRect (left, top, width, height);
      } else {
        console.log('No coordinates provided.');
      }
    }
  };

  var CanvasSon = function () {};
  CanvasSon.prototype = new Canvas();
  CanvasSon.prototype.test = function () {};
  CanvasSon.prototype.constructor = 'Canvas';

  window.canvas = new Canvas();
  window.canvasSon = new CanvasSon();
})(jQuery);