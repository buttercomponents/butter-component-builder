import React from 'react';
import {translate} from 'react-i18next';

let Test = ({t}) => (
    <div>
        test
        <br/>
        {t('translated')}
    </div>
)

export default translate('test')(Test)
