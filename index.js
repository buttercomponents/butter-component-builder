import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { I18nextProvider} from 'react-i18next';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk'

import Component, {store, actions, reducers} from 'btm_src';
import i18n from './i18n';

let testData = {}

try {
    testData = require('btm_test').default;
} catch (e){
    console.error ('could not load test data')
}

const root = document.getElementById('root')
root.className = 'theme-dark';

const testReducers = reducers || {
    test: (state, action) => ({
        ...testData,
        ...state
    })
}

const middlewares = [thunk]
const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const testStore = store || createStore(combineReducers({
    ...testReducers,
    router: routerReducer
}), composeEnhancers(applyMiddleware(...middlewares)))


if (actions) {
    console.error('ACTIONS', actions)
    Object.values(actions).map(a => testStore.dispatch(a.FETCH()))
}

render(
    <HashRouter>
        <I18nextProvider i18n={i18n}>
            <Provider store={testStore}>
                <Component {...testData} />
            </Provider>
        </I18nextProvider>
    </HashRouter>,
    root);
