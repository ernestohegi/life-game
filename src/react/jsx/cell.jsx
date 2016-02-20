let Cell = (() => {
    'use strict';

    const CELL_INITIAL_STATUS = 'dead';

    return React.createClass({
        id: 0,
        mixins: [Reflux.ListenerMixin],
        getInitialState: function () {
            return {
                status: CELL_INITIAL_STATUS
            };
        },
        componentDidMount: function () {
            this.id = Number.parseInt(this.props.cellId, 10);

            CellStatusStore.listen(this.updateCellState.bind(this));
        },
        updateCellState: function (data) {
            if ((data.cellId === this.id) === false) {
                return false;
            }

            this.setState({
                status: data.status
            });
        },
        render: function () {
            return (
                <span className="cell" data-id={ this.props.cellId } data-status={ this.state.status }></span>
            );
        }
    });
})();
