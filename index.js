import React from 'react';
import { render } from 'react-dom';
import { I18nextProvider} from 'react-i18next';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { routerReducer } from 'react-router-redux';

import Component from 'btm_src';
import i18n from './i18n';

let testData = {}

try {
    testData = require('btm_test').default;
} catch (e){
    console.error ('could not load test data')
}

const root = document.getElementById('root')
root.className = 'theme-dark';

const testReducers = Object.keys(testData).reduce((a, k) => (
    Object.assign(a, {[k]: (state, action) => ({
        ...testData[k]
    })})
), {})

const store = createStore(combineReducers({
    ...testReducers,
    router: routerReducer
}), typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

render(
    <I18nextProvider i18n={ i18n }>
        <Provider store={store}>
            <Component {...testData} />
        </Provider>
    </I18nextProvider>,
    root);
