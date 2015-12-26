import React from 'react';
import {List, Map} from 'immutable';

const pair = List.of('Movie ID 1', 'Movie ID 2');
const tally = Map({'Movie ID 1': 5, 'Movie ID 2': 8});

export default React.createClass({
    render: function () {
        return React.cloneElement(this.props.children, {
            pair: pair,
            tally: tally
        });
    }
});
