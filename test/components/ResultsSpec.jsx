import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';
import TestUtils from 'react-addons-test-utils';
import {Results} from '../../src/components/Results';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate} = TestUtils;

describe('Results', () => {

    it('renders entries with vote counts or zero', () => {
        const pair = List.of('Movie ID 1', 'Movie ID 2');
        const tally = Map({'Movie ID 1': 3});
        const containerComponent = document.createElement('div');
        const component = ReactDOM.render(
            <Results pair={pair} tally={tally} />,
            containerComponent
        );

        const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
        const [Movie1, Movie2] = entries.map(entry => entry.textContent);

        expect(entries.length).to.equal(2);
        expect(Movie1).to.contain('Movie ID 1');
        expect(Movie1).to.contain('3');
        expect(Movie2).to.contain('Movie ID 2');
        expect(Movie2).to.contain('0');
    });

    it('invokes action callback when restart button is clicked', () => {
        let restartInvoked = false;
        const restart = () => restartInvoked = true;
        const pair = List.of('Movie ID 1', 'Movie ID 2');
        const component = renderIntoDocument(
            <Results
                pair={pair}
                tally={Map()}
                restart={restart}
            />
        );

        Simulate.click(ReactDOM.findDOMNode(component.refs.restart));

        expect(restartInvoked).to.equal(true);

    });

    it('invokes action callback when next button is clicked', () => {
        let nextInvoked = false;
        const next = () => nextInvoked = true;
        const pair = List.of('Movie ID 1', 'Movie ID 2');
        const component = renderIntoDocument(
            <Results
                pair={pair}
                tally={Map()}
                next={next}
            />
        );

        Simulate.click(ReactDOM.findDOMNode(component.refs.next));

        expect(nextInvoked).to.equal(true);
    });

    it('renders the winner when there is one', () => {
        const component = renderIntoDocument(
            <Results
                winner="Movie ID 1"
                pair={List()}
                tally={Map()}
            />
        );
        const winner = ReactDOM.findDOMNode(component.refs.winner);

        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('Winner is Movie ID 1');
    });

});