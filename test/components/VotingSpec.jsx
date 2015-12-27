import React from 'react';
import ReactDOM from 'react-dom';
import {List} from 'immutable';
import TestUtils from 'react-addons-test-utils';
import {Voting} from '../../src/components/Voting';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = TestUtils;

describe('Voting', () => {

    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(
            <Voting pair={['Movie ID 1', 'Movie ID 2']} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('Movie ID 1');
        expect(buttons[1].textContent).to.equal('Movie ID 2');
    });

    it('invokes callback when a button is clicked', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry;

        const component = renderIntoDocument(
            <Voting
                pair={['Movie ID 1', 'Movie ID 2']}
                vote={vote}
            />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0]);

        expect(votedWith).to.equal('Movie ID 1');
    });

    it('disables buttons when user has voted', () => {
        const component = renderIntoDocument(
            <Voting
                pair={['Movie ID 1', 'Movie ID 2']}
                hasVoted="Movie ID 1"
            />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    });

    it('adds label to the voted entry', () => {
        const component = renderIntoDocument(
            <Voting
                pair={['Movie ID 1', 'Movie ID 2']}
                hasVoted="Movie ID 1"
            />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons[0].textContent).to.contain('Voted');
    });

    it('renders just the winner when there is one', () => {
        const component = renderIntoDocument(
            <Voting
                pair={['Movie ID 1', 'Movie ID 2']}
                winner="Movie ID 1"
            />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(0);

        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('Winner is Movie ID 1');
    });

    it('renders as a pure component', () => {
        const pair = ['Movie ID 1', 'Movie ID 2'];
        const containerComponent = document.createElement('div');

        let component = ReactDOM.render(
            <Voting pair={pair} />,
            containerComponent
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Movie ID 1');

        pair[0] = 'Movie ID one';
        component = ReactDOM.render(
            <Voting pair={pair} />,
            containerComponent
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Movie ID 1');
    });

    it('does update DOM when prop changes', () => {
        const pair = List.of('Movie ID 1', 'Movie ID 2');
        const containerComponent = document.createElement('div');

        let component = ReactDOM.render(
            <Voting pair={pair} />,
            containerComponent
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Movie ID 1');

        const newPair = pair.set(0, 'Movie ID one');
        component = ReactDOM.render(
            <Voting pair={newPair} />,
            containerComponent
        );
        
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Movie ID one');
    });

});