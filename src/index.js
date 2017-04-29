import React from 'react';
import {translate} from 'react-i18next';

import style from './dummy.styl'

let Test = ({test, t}) => (
    <div>
        test
        <br/>
        {t('translated')}
        <br/>
        <i className="material-icons">arrow_back</i>test material icons
        <br/>
        <p className={style.testTheme}>Theme Main color</p>
        <br/>
        <p>Test data loading: {test}</p>
    </div>
)

export default translate('test')(Test)
