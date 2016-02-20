let Game = (($) => {
    'use strict';

    return {
        init: (params) => {
            Life.init({
                container: params.container,
                item: 'li',
                speed: 1,
                colors: false
            });

            Interface.init({
                container: params.container
            });
        }
    };
})(jQuery);
