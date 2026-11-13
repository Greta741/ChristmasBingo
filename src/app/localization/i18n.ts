import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from './resources'

void i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['lt', 'en'],
  initAsync: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
})

export default i18n
