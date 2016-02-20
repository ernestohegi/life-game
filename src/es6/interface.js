let Interface = (($) => {
    'use strict';

    const COLORS = false;

    return {
        colors: false,
        init: function (params) {
            this.$container = params.container;
            this.gridSize = params.gridSize;
            this.bindEvents();
        },
        /*
        * Events binding
        */
        bindEvents: function () {
            var $menu = $('#menu');

            $menu.on('click', '#start', () => Life.start(this.gridSize.x, this.gridSize.y));

            $menu.on('click', '#stop', () => Life.stop());

            $menu.on('click', '#clear', () => {
                Life.stop();
                Life.drawGrid(this.gridSize.x, this.gridSize.y);
                Life.cloneGrid(this.gridSize.x, this.gridSize.y);
            });

            $menu.on('click', '#colorize', () => {
                this.colors = !this.colors;

                Life.updateSettings({
                    colors: this.colors
                });
            });

            // Draw seeds
            this.$container.on('click', '.survivor', e => Life.selectSurvivor($(e.currentTarget)));

            this.$container.on('mouseover', '.survivor', e => {
                if (e.ctrlKey) {
                    Life.selectSurvivor(
                        $(e.currentTarget)
                    );
                }
            });
        }
    };
})(jQuery);
