import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setState, setClientId, setConnectionState} from './actionCreators';
import remoteActionMiddleware from './remoteActionMiddleware';
import getClientId from './clientId';
import App from './components/App';
import ConnectionStateContainer from './components/ConnectionState';
import VotingContainer from './components/Voting';
import ResultsContainer from './components/Results';

const socket = io(`${location.protocol}//${location.hostname}:8090`);

const createStoreWithMiddleware = applyMiddleware(
    remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);
store.dispatch(setClientId(getClientId()));

socket.on('state', state =>
    store.dispatch(setState(state))
);

[
    'connect',
    'connect_error',
    'connect_timeout',
    'reconnect',
    'reconnecting',
    'reconnect_error',
    'reconnect_failed'
].forEach(event => 
    socket.on(event, () => 
        store.dispatch(setConnectionState(event, socket.connected))
    )
);

const routes = (
    <Route component={App}>
        <Route path="/results" component={ResultsContainer} />
        <Route path="/" component={VotingContainer} />
    </Route>
);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <ConnectionStateContainer />
            <Router>{routes}</Router>
        </div>
    </Provider>,
    document.getElementById('app')
);
