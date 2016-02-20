let CellStatusStore = (() => {
    'use strict';

    return Reflux.createStore({
        init: function() {
            this.listenTo(CellStatusAction, this.output);
        },
        output: function(lives) {
            let status = lives ? 'live' : 'dead';

            this.trigger(status);
        }
    });
})();
