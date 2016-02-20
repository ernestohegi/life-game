let Organism = (() => {
    'use strict';

    return React.createClass({
        render: function () {
            return (
                <ul className="organism">
                    <CellContainer row={ 1 }/>
                </ul>
            );
        }
    });
})();
