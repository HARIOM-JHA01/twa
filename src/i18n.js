import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;