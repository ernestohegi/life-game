let CellContainer = (() => {
    'use strict';

    return React.createClass({
        render: function () {
            return (
                <li className="cell-container" data-row={ this.props.row }>
                    <Cell column={ 1 }/>
                </li>
            );
        }
    });
})();
