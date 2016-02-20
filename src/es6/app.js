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
        gridSize        : {x: 40, y: 40},
        total           : () => this.gridSize.x * this.gridSize.y ,
        randomColor     : ALIVE_COLOR,
        item            : '',
        interval        : '',
        init: function (params) {
            if (params === undefined || params.container === undefined || params.item === undefined) {
                throw 'No params specified.';
            }

            this.$container = params.container;
            this.item = params.item;

            this.drawGrid();
            this.updateSettings(params);
            this.bindEvents();
        },
        start: function () {
            requestAnimationFrameId = requestAnimationFrame(this.runGrid.bind(this));
        },
        stop: function () {
             cancelAnimationFrame(requestAnimationFrameId);
        },
        /*
        * Makes grid an array
        */
        cloneGrid: function () {
            var i, j;

            this.rows = [];
            this.newRows = [];

            for (i = 0; i < this.gridSize.x; i++) {
                this.rows.push([]);
                this.newRows.push([]);
                for (j = 0; j < this.gridSize.y; j++) {
                    this.rows[i].push(DIE);
                    this.newRows[i].push(DIE);
                }
            }
        },
        runGrid: function () {
            for (var i = 0; i < this.gridSize.x; i++) {
                for (var j = 0; j < this.gridSize.y; j++) {
                    this.checkNeighbors(i, j);
                }
            }

            this.updateRows(this.newRows);
            this.updateSurvivors();

            requestAnimationFrameId = requestAnimationFrame(this.runGrid.bind(this));
        },
        drawGrid: function () {
            var open, close,
                item = '',
                survivor,
                width;

            for (var x = 0; x < this.gridSize.x; x++) {
                open = '<' + this.item + ' data-row="' + x + '">';
                item += open;

                for (var y = 0; y < this.gridSize.y; y++) {
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
            width = this.gridSize.x * this.$container.find('.survivor').width();

            this.$container.width(width);
            this.$container.parent('.container').width(width);

            this.cloneGrid();
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
        isInsideTheXAxis: function (index) {
            return index > -1 && index <= this.gridSize.x;
        },
        isInsideTheYAxis: function (index) {
            return index > -1 && index <= this.gridSize.y;
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
        updateSurvivors: function () {
            var $rows = this.$rows.clone(),
                $survivor,
                thisRowStatus,
                backgroundColor = DEAD_COLOR;

            for (var i = 0; i < this.gridSize.x; i++) {
                for (var j = 0; j < this.gridSize.y; j++) {
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
        },
        /*
        * Events binding
        */
        bindEvents: function () {
            var that = this,
                $menu = $('#menu');

            // Buttons events
            $menu.on('click', '#start', function () {
                that.start();
            });

            $menu.on('click', '#stop', function () {
                that.stop();
            });

            $menu.on('click', '#clear', function () {
                that.drawGrid();
                that.cloneGrid();
            });

            $menu.on('click', '#colorize', function () {
                that.updateSettings({
                    colors: !that.colors
                });
            });

            // Draw seeds
            this.$container.on('click', '.survivor', function () {
                that.selectSurvivor($(this));
            });

            this.$container.on('mouseover', '.survivor', function (e) {
                if (e.ctrlKey) {
                    that.selectSurvivor($(this));
                }
            });
        }
    };
})(jQuery);