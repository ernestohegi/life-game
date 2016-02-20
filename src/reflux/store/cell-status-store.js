let CellStatusStore = (() => {
    'use strict';

    return Reflux.createStore({
        init: function() {
            this.listenTo(CellStatusAction, this.sendCellMessage);
        },
        sendCellMessage: function(cellId, lives) {
            this.trigger({
                cellId,
                status: lives ? 'live' : 'dead'
            });
        }
    });
})();
