let Organism = (() => {
    'use strict';

    return React.createClass({
        render: function () {
            return (
                React.createElement("ul", {className: "organism"}, 
                    React.createElement(CellContainer, {row:  1 })
                )
            );
        }
    });
})();
