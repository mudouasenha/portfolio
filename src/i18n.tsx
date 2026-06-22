import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import pt from './locales/pt/translation.json';

i18n
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'pt'],
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
