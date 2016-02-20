let Organism = (() => {
    'use strict';

    return React.createClass({
        getCellContainers: function () {
            let cellRows = [],
                i;

            for (i = 1; i <= this.props.cellContainersAmount; ++i) {
                cellRows.push(
                    React.createElement(CellContainer, {row:  i, key:  i, cellsAmount:  this.props.cellsAmount})
                );
            }

            return cellRows;
        },
        render: function () {
            return (
                React.createElement("ul", {className: "organism"}, 
                     this.getCellContainers() 
                )
            );
        }
    });
})();
