import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles SET_STATE', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: fromJS({
                vote: {
                    pair: ['Movie ID 1', 'Movie ID 2'],
                    tally: {
                        'Movie ID 1': 3
                    }
                }
            })
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Movie ID 1', 'Movie ID 2'],
                tally: {
                    'Movie ID 1': 3
                }
            }
        }));
    });

    it('handles SET_STATE with plain JS payload', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Movie ID 1', 'Movie ID 2'],
                    tally: {
                        'Movie ID 1': 3
                    }
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Movie ID 1', 'Movie ID 2'],
                tally: {
                    'Movie ID 1': 3
                }
            }
        }));
    });

    it('handles SET_STATE without initial state', () => {
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Movie ID 1', 'Movie ID 2'],
                    tally: {
                        'Movie ID 1': 3
                    }
                }
            }
        };
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Movie ID 1', 'Movie ID 2'],
                tally: {
                    'Movie ID 1': 3
                }
            }
        }));
    });

    it('handles VOTE by setting hasVoted', () => {
        const state = fromJS({
            vote: {
                pair: ['Movie ID 1', 'Movie ID 2'],
                tally: {'Movie ID 1': 5}
            }
        });
        const action = {
            type: 'VOTE',
            entry: 'Movie ID 1'
        };
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Movie ID 1', 'Movie ID 2'],
                tally: {'Movie ID 1': 5}
            },
            hasVoted: 'Movie ID 1'
        }));
    });

    it('does not set hasVoted for VOTE on invalid entry', () => {
        const state = fromJS({
            vote: {
                pair: ['Movie ID 1', 'Movie ID 2'],
                tally: {'Movie ID 1': 5}
            }
        });
        const action = {
            type: 'VOTE',
            entry: 'Whatever'
        };
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Movie ID 1', 'Movie ID 2'],
                tally: {'Movie ID 1': 5}
            }
        }));
    });

    it('removes hasVoted on SET_STATE if pair changes', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Movie ID 1', 'Movie ID 2'],
                tally: {'Movie ID 1': 5}
            },
            hasVoted: 'Movie ID 1'
        });
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Movie ID 3', 'Movie ID 4']
                }
            }
        };
        const newState = reducer(initialState, action);

        expect(newState).equal(fromJS({
            vote: {
                pair: ['Movie ID 3', 'Movie ID 4']
            }
        }));
    });

});
