import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles, SET_CLIENT_ID', () => {
        const initialState = Map();
        const action = {
            type: 'SET_CLIENT_ID',
            clientId: 'Client ID 1'
        }
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            clientId: 'Client ID 1'
        }));
    });

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

    it('handles VOTE by setting myVote', () => {
        const state = fromJS({
            vote: {
                round: 9,
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
                round: 9,
                pair: ['Movie ID 1', 'Movie ID 2'],
                tally: {'Movie ID 1': 5}
            },
            myVote: {
                round: 9,
                entry: 'Movie ID 1'
            }
        }));
    });

    it('does not set myVote for VOTE on invalid entry', () => {
        const state = fromJS({
            vote: {
                round: 9,
                pair: ['Movie ID 1', 'Movie ID 2'],
                tally: {'Movie ID 1': 5}
            }
        });
        const action = {
            type: 'VOTE',
            entry: 'whatever'
        };
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                round: 9,
                pair: ['Movie ID 1', 'Movie ID 2'],
                tally: {'Movie ID 1': 5}
            }
        }));
    });

    it('removes hasVoted on SET_STATE if round has changed', () => {
        const initialState = fromJS({
            vote: {
                round: 9,
                pair: ['Movie ID 1', 'Movie ID 2'],
                tally: {'Movie ID 1': 5}
            },
            myVote: {
                round: 9,
                entry: 'Movie ID 1'
            }
        });
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    round: 10,
                    pair: ['Movie ID 3', 'Movie ID 4']
                }
            }
        };
        const newState = reducer(initialState, action);

        expect(newState).equal(fromJS({
            vote: {
                round: 10,
                pair: ['Movie ID 3', 'Movie ID 4']
            }
        }));
    });

});
