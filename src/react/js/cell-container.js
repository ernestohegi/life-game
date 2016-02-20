let CellContainer = (() => {
    'use strict';

    return React.createClass({
        getCells: function () {
            let cellRows = [],
                i;

            for (i = 1; i <= this.props.cellsAmount; ++i) {
                cellRows.push(
                    React.createElement(Cell, {cellId:  this.props.row.toString() + i, key:  i })
                );
            }

            return cellRows;
        },
        render: function () {
            return (
                React.createElement("li", {className: "cell-container", "data-row":  this.props.row}, 
                     this.getCells() 
                )
            );
        }
    });
})();
