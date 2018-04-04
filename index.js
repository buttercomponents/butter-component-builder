import React from 'react';
import { render } from 'react-dom';
import { I18nextProvider} from 'react-i18next';

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


render(<I18nextProvider i18n={ i18n }><Component {...testData} /></I18nextProvider>, root);
