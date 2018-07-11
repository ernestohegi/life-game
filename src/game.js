const Game = (() => {
  "use strict";

  const data = {
    canvas: document.getElementById("game"),
    dimensions: {
      x: 40,
      y: 40,
      z: 20
    }
  };

  return {
    init: () => {
      Life.init(data);
      Interface.init(data);
    }
  };
})();
