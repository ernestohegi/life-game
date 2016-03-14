let Life = (function ($) {
    'use strict';

    const BACKGROUND_COLOR_PROPERTY   = 'background-color',
          DATA_STATUS_ATTRIBUTE       = 'data-status',
          SELECTED_CLASS_NAME         = 'selected',
          LIVE                        = 'live',
          DIE                         = 'die',
          ALIVE_COLOR                 = '#000',
          DEAD_COLOR                  = '#FFF';

    let requestAnimationFrameId = '',
        colors                  = false,
        speed                   = 1000,
        newRows                 = [],
        rows                    = [],
        gridSize                = {},
        $container              = $(),
        $rows                   = $(),
        $survivor               = $('<span class="survivor"/>'),
        item                    = '';

    return {
        init: function (params) {
            if (params === undefined || params.container === undefined || params.item === undefined) {
                throw 'No params specified.';
            }

            $container = params.container;
            item = params.item;

            this.setGridSize(40, 40);
            this.createGrid();
            this.drawGrid();
            this.updateSettings(params);
        },
        setGridSize: function (x, y) {
            gridSize.x = x;
            gridSize.y = y;
        },
        start: function () {
            requestAnimationFrameId = requestAnimationFrame(this.runGrid.bind(this));
        },
        stop: function () {
             cancelAnimationFrame(requestAnimationFrameId);
        },
        createGrid: function () {
            let i, j;

            rows = [];
            newRows = [];

            for (i = 0; i < gridSize.x; ++i) {
                rows.push([]);
                newRows.push([]);

                for (j = 0; j < gridSize.y; ++j) {
                    rows[i].push(DIE);
                    newRows[i].push(DIE);
                }
            }
        },
        drawGrid: function () {
            var open, close,
                newItem = '',
                survivor,
                width,
                x;

            for (x = 0; x < gridSize.x; x++) {
                open = '<' + item + ' data-row="' + x + '">';
                newItem += open;

                for (var y = 0; y < gridSize.y; y++) {
                    survivor = $survivor.clone();
                    survivor.attr('data-column', y);
                    survivor.attr(DATA_STATUS_ATTRIBUTE, DIE);

                    newItem += survivor.wrap('<div>').parent().html();
                }

                close = '</' + item + '>';
                newItem += close;
            }

            $container.html(newItem);
            $rows = $container.find('li');

            // Get elements width after insertion to its parent
            width = gridSize.x * $container.find('.survivor').width();

            $container.width(width);
            $container.parent('.container').width(width);

            this.createGrid();
        },
        runGrid: function () {
            let i, j;

            for (i = 0; i < gridSize.x; ++i) {
                for (j = 0; j < gridSize.y; ++j) {
                    this.checkNeighbors(i, j);
                }
            }

            this.updateRows(newRows);
            this.updateSurvivors();

            requestAnimationFrameId = requestAnimationFrame(this.runGrid.bind(this));
        },
        checkNeighbors: function (x, y) {
            let neighborsCount = 0,
                i,
                j;

            for(i = x-1; i <= x+1; ++i) {
                if (this.isInsideTheXAxis(i, x)) {
                    for(j = y-1; j <= y+1; ++j) {
                        if (this.isInsideTheYAxis(j) && this.isNeighborAlive(i, j)) {
                            ++neighborsCount;
                        }
                    }
                }
            }

            newRows[x][y] = this.getDestiny(neighborsCount, (newRows[x][y] === LIVE));
        },
        getDestiny: function (neighborsCount, isAlive) {
            return ((isAlive && (neighborsCount === 3 || neighborsCount === 2)) || (isAlive === false && neighborsCount === 3)) ? LIVE : DIE;
        },
        isInsideTheXAxis: function (index, x) {
            return this.isInsideTheCoordinates(index, x, gridSize.x);
        },
        isInsideTheYAxis: function (index, y) {
            return this.isInsideTheCoordinates(index, y, gridSize.y);
        },
        isInsideTheCoordinates: function (coordinate, position, gridCoordinate) {
            return coordinate !== undefined && position !== undefined && coordinate > -1 && coordinate <= gridCoordinate;
        },
        isNeighborAlive: function (x, y) {
            return rows[x] !== undefined && rows[x][y] !== undefined && rows[x][y] === LIVE;
        },
        updateRows: function (newRows) {
            rows = newRows;
        },
        updateSurvivors: function () {
            var $newRows = $rows.clone(),
                $survivor,
                thisRowStatus,
                backgroundColor = DEAD_COLOR;

            for (var i = 0; i < gridSize.x; i++) {
                for (var j = 0; j < gridSize.y; j++) {
                    $survivor = $newRows.filter('[data-row='+ i +']').find('[data-column='+ j +']');
                    thisRowStatus = rows[i][j];

                    if ($survivor.attr(DATA_STATUS_ATTRIBUTE) !== thisRowStatus) {
                        if (thisRowStatus === LIVE) {
                            backgroundColor = (colors) ? this.getRandomColor() : ALIVE_COLOR;
                        }

                        $survivor.toggleClass(SELECTED_CLASS_NAME);
                        $survivor.css(BACKGROUND_COLOR_PROPERTY, backgroundColor);
                        $survivor.attr(DATA_STATUS_ATTRIBUTE, thisRowStatus);
                    }
                }
            }

            $container.html('');
            $container.append($newRows);
        },
        selectSurvivor: function ($this) {
            var newStatus = $this.attr(DATA_STATUS_ATTRIBUTE) === DIE ? LIVE : DIE;

            $this.toggleClass(SELECTED_CLASS_NAME);
            $this.attr(DATA_STATUS_ATTRIBUTE, newStatus);

            rows[$this.parent().data('row')][$this.data('column')] = newStatus;

            $this.css(BACKGROUND_COLOR_PROPERTY, (colors) ? this.getRandomColor() : ALIVE_COLOR);
        },
        updateSettings: function (params) {
            if (params !== undefined) {
                if (params.speed !== undefined) {
                    speed = params.speed;
                }

                if (params.colors !== undefined) {
                    colors = params.colors;
                }
            }
        },
        getRandomColor: function () {
            return '#'+Math.floor(Math.random()*16777215).toString(16);
        }
    };
})(jQuery);
