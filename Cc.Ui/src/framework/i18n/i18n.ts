import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import * as moment from 'moment';
import 'moment/locale/it';
/*import 'moment/locale/nl';
import 'moment/locale/es';
import 'moment/locale/fr';
import 'moment/locale/de';*/

    // .use(XHR)
    // .use(LanguageDetector)

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    //.use(intervalPlural)
    .init({
        backend: {
            // for all available options read the backend's repository readme file
            loadPath: process.env.PUBLIC_URL + '/locales/{{lng}}/{{ns}}.json'
        },
        fallbackLng: 'it',
        // have a common namespace used around the full app
        ns: ['common', 'views', 'entities', 'workflows', 'types'],
        defaultNS: 'common',
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react!!
        },
        react: {
            useSuspense: true
        }
    },  
    (err: any, t: any) => {

        // TODO sistemare
        // let language = t('common:key');
        // if (language === undefined || language.length > 2) {
        //     throw Error('Key language not defined');
        // }
        
        // moment.locale(language);
    });

export default i18n;