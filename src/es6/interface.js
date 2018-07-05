let Interface = (($) => {
    'use strict';

    const ID_TOKEN                  = '#',
          CLASS_TOKEN               = '.',
          CLICK_EVENT_NAME          = 'click',
          MOUESOVER_EVENT_NAME      = 'mouseover',
          REACT_CONTAINER_ID_NAME   = 'react',
          SURVIVOR_SELECTOR         = CLASS_TOKEN + 'survivor',
          MENU_SELECTOR             = ID_TOKEN + 'menu',
          START_SELECTOR            = ID_TOKEN + 'start',
          CLEAR_SELECTOR            = ID_TOKEN + 'clear',
          COLORIZE_SELECTOR         = ID_TOKEN + 'colorize',
          STOP_SELECTOR             = ID_TOKEN + 'stop',
          CELLS_CONTAINERS_AMOUNT   = 10,
          CELLS_AMOUNT              = 10;

    return {
        colors: false,
        init: function (params) {
            this.$container = params.container;
            this.$mainElement = $(MENU_SELECTOR);
            this.drawOrganism();
            this.bindEvents();
        },
        drawOrganism: () => {
            ReactDOM.render(
                React.createElement(
                    Organism,
                    {
                        cellContainersAmount: CELLS_CONTAINERS_AMOUNT,
                        cellsAmount: CELLS_AMOUNT
                    }
                ),
                document.getElementById(REACT_CONTAINER_ID_NAME)
            );
        },
        selectSurvivor:  survivorElement => {
            Life.selectSurvivor(
                $(survivorElement)
            );
        },
        clearGrid: function () {
            Life.stop();
            Life.drawGrid();
            Life.createGrid();
        },
        colorizeGrid: function () {
            let colors = !this.colors;

            Life.updateSettings({
                colors
            });

            this.colors = colors;
        },
        handleSurvivorClick: function (e) {
            this.selectSurvivor(e.currentTarget);
        },
        handleSurvivorMouseover: function (e) {
            if (e.ctrlKey || e.altKey) {
                this.selectSurvivor(e.currentTarget);
            }
        },
        /*
        * Events binding
        */
        bindEvents: function () {
            this.$mainElement.on(CLICK_EVENT_NAME, START_SELECTOR, () => Life.start());

            this.$mainElement.on(CLICK_EVENT_NAME, STOP_SELECTOR, () => Life.stop());

            this.$mainElement.on(CLICK_EVENT_NAME, CLEAR_SELECTOR, this.clearGrid);

            this.$mainElement.on(CLICK_EVENT_NAME, COLORIZE_SELECTOR, this.colorizeGrid);

            // Draw seeds
            this.$container.on(CLICK_EVENT_NAME, SURVIVOR_SELECTOR, this.handleSurvivorClick.bind(this));

            this.$container.on(MOUESOVER_EVENT_NAME, SURVIVOR_SELECTOR, this.handleSurvivorMouseover.bind(this));
        }
    };
})(jQuery);
