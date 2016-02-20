let CellContainer = (() => {
    'use strict';

    return React.createClass({
        render: function () {
            return (
                React.createElement("li", {className: "cell-container", "data-row":  this.props.row}, 
                    React.createElement(Cell, {column:  1 })
                )
            );
        }
    });
})();
