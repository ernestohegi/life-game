let Life = (function ($) {
    'use strict';

    const BACKGROUND_COLOR_PROPERTY   = 'background-color',
          DATA_STATUS_ATTRIBUTE       = 'data-status',
          SELECTED_CLASS_NAME         = 'selected',
          LIVE                        = 'live',
          DIE                         = 'die',
          ALIVE_COLOR                 = '#000',
          DEAD_COLOR                  = '#FFF';

    let requestAnimationFrameId = '';

    return {
        $container      : $(),
        $survivor       : $('<span class="survivor"/>'),
        $rows           : $(),
        rows            : [],
        newRows         : [],
        caterpillars    : [],
        speed           : 1000,
        colors          : false,
        evolver         : 0,
        randomColor     : ALIVE_COLOR,
        item            : '',
        interval        : '',
        init: function (params) {
            console.log(params);

            if (params === undefined || params.container === undefined || params.item === undefined) {
                throw 'No params specified.';
            }

            this.$container = params.container;
            this.item = params.item;
            this.total = params.gridSize.x * params.gridSize.y;

            this.drawGrid(params.gridSize.x, params.gridSize.y);
            this.updateSettings(params);
        },
        drawGrid: function (gridSizeX, gridSizeY) {
            var open, close,
                item = '',
                survivor,
                width;

            for (var x = 0; x < gridSizeX; x++) {
                open = '<' + this.item + ' data-row="' + x + '">';
                item += open;

                for (var y = 0; y < gridSizeY; y++) {
                    survivor = this.$survivor.clone();
                    survivor.attr('data-column', y);
                    survivor.attr(DATA_STATUS_ATTRIBUTE, DIE);

                    item += survivor.wrap('<div>').parent().html();
                }

                close = '</' + this.item + '>';
                item += close;
            }

            this.$container.html(item);
            this.$rows = this.$container.find('li');

            // Get elements width after insertion to its parent
            width = gridSizeX * this.$container.find('.survivor').width();

            this.$container.width(width);
            this.$container.parent('.container').width(width);

            this.cloneGrid(gridSizeX, gridSizeY);
        },
        start: function (gridSizeX, gridSizeY) {
            requestAnimationFrameId = requestAnimationFrame(() => this.runGrid(gridSizeX, gridSizeY));
        },
        stop: function () {
             cancelAnimationFrame(requestAnimationFrameId);
        },
        /*
        * Makes grid an array
        */
        cloneGrid: function (gridSizeX, gridSizeY) {
            var i, j;

            this.rows = [];
            this.newRows = [];

            for (i = 0; i < gridSizeX; i++) {
                this.rows.push([]);
                this.newRows.push([]);
                for (j = 0; j < gridSizeY; j++) {
                    this.rows[i].push(DIE);
                    this.newRows[i].push(DIE);
                }
            }
        },
        runGrid: function (gridSizeX, gridSizeY) {
            for (var i = 0; i < gridSizeX; i++) {
                for (var j = 0; j < gridSizeY; j++) {
                    this.checkNeighbors(i, j);
                }
            }

            this.updateRows(this.newRows);
            this.updateSurvivors(gridSizeX, gridSizeY);

            requestAnimationFrameId = requestAnimationFrame(() => this.runGrid(gridSizeX, gridSizeY));
        },
        checkNeighbors: function (x, y) {
            var neighborsCount = 0;

            for(var i = x-1; i <= x+1; i++) {
                if (this.isInsideTheXAxis(i)) {
                    for(var j = y-1; j <= y+1; j++) {
                        if (this.isInsideTheYAxis(j) && this.isNeighbor(x, y, i, j) && this.isNeighborAlive(i, j)) {
                            neighborsCount++;
                        }
                    }
                }
            }

            this.newRows[x][y] = this.getDestiny(neighborsCount, (this.newRows[x][y] === LIVE));
        },
        getDestiny: function (neighborsCount, isAlive) {
            return (neighborsCount === 3 || (neighborsCount === 2 && isAlive)) ? LIVE : DIE;
        },
        isInsideTheXAxis: function (index, gridSizeX) {
            return index > -1 && index <= gridSizeX;
        },
        isInsideTheYAxis: function (index, gridSizeY) {
            return index > -1 && index <= gridSizeY;
        },
        isNeighbor: function (xAxis, yAxis, xAxisIndex, yAxisIndex) {
            return (
                (xAxisIndex === xAxis-1) || (xAxisIndex === xAxis+1) || (xAxisIndex === xAxis && yAxisIndex !== yAxis)
            );
        },
        isNeighborAlive: function (x, y) {
            return this.rows[x] !== undefined && this.rows[x][y] !== undefined && this.rows[x][y] === LIVE;
        },
        updateRows: function (newRows) {
            this.rows = newRows;
        },
        /*
        * Updates survivors status.
        * Updates the grid with new states.
        */
        updateSurvivors: function (gridSizeX, gridSizeY) {
            var $rows = this.$rows.clone(),
                $survivor,
                thisRowStatus,
                backgroundColor = DEAD_COLOR;

            for (var i = 0; i < gridSizeX; i++) {
                for (var j = 0; j < gridSizeY; j++) {
                    $survivor = $rows.filter('[data-row='+ i +']').find('[data-column='+ j +']');
                    thisRowStatus = this.rows[i][j];

                    if ($survivor.attr(DATA_STATUS_ATTRIBUTE) !== thisRowStatus) {
                        if (thisRowStatus === LIVE) {
                            backgroundColor = (this.colors) ? this.getRandomColor() : ALIVE_COLOR;
                        }

                        $survivor.toggleClass(SELECTED_CLASS_NAME);
                        $survivor.css(BACKGROUND_COLOR_PROPERTY, backgroundColor);
                        $survivor.attr(DATA_STATUS_ATTRIBUTE, thisRowStatus);
                    }
                }
            }

            this.$container.html('');
            this.$container.append($rows);
        },
        /*
        * Selects survivor
        */
        selectSurvivor: function ($this) {
            var newStatus = $this.attr(DATA_STATUS_ATTRIBUTE) === DIE ? LIVE : DIE;

            $this.toggleClass(SELECTED_CLASS_NAME);
            $this.attr(DATA_STATUS_ATTRIBUTE, newStatus);

            this.rows[$this.parent().data('row')][$this.data('column')] = newStatus;

            $this.css(BACKGROUND_COLOR_PROPERTY, (this.colors) ? this.getRandomColor() : ALIVE_COLOR);
        },
        /*
        * Updates current settings
        */
        updateSettings: function (params) {
            if (params !== undefined) {
                if (params.speed !== undefined) {
                    this.speed = params.speed;
                }

                if (params.colors !== undefined) {
                    this.colors = params.colors;
                }
            }
        },
        getRandomColor: function () {
            return '#'+Math.floor(Math.random()*16777215).toString(16);
        }
    };
})(jQuery);
