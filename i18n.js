import i18n from 'i18next'
import { reactI18nextModule} from 'react-i18next';

i18n
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: true,

    interpolation: {
      escapeValue: false // not needed for react!!
    },
    react: {
      wait: true
    }
  });

module.exports = i18n;
