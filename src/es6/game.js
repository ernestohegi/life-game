let Game = ($ => {
  "use strict";

  const x = 40;
  const y = 40;
  const z = 20;

  return {
    init: params => {
      const canvas = document.getElementById("game");

      Life.init({
        container: params.container,
        item: "li",
        speed: 1,
        colors: false,
        x,
        y,
        z,
        canvas
      });

      Interface.init({
        container: params.container,
        x,
        y,
        z,
        canvas
      });
    }
  };
})(jQuery);
