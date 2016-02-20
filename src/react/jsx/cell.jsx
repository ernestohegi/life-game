let Cell = (() => {
    'use strict';

    const DEAD_STATUS = 'dead';

    return React.createClass({
        getInitialState: () => {
            return {
                status: DEAD_STATUS
            };
        },
        componentDidMount: function () {
            CellStatusStore.listen(this.updateCellState);
        },
        updateCellState: function (data) {
            console.log('change from a method');
            console.log(data);

            this.setState({
                status: 'live'
            });
        },
        render: function () {
            return (
                <span
                    className="cell"
                    data-status={ this.state.status }
                    data-column={ this.props.column }
                >
                </span>
            );
        }
    });
})();
