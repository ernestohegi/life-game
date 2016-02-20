let CellContainer = (() => {
    'use strict';

    return React.createClass({
        getCells: function () {
            let cellRows = [],
                i;

            for (i = 1; i <= this.props.cellsAmount; ++i) {
                cellRows.push(
                    <Cell cellId={ this.props.row.toString() + i } key={ i } />
                );
            }

            return cellRows;
        },
        render: function () {
            return (
                <li className="cell-container" data-row={ this.props.row }>
                    { this.getCells() }
                </li>
            );
        }
    });
})();
