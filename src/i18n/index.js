import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './locales/en.json'

Vue.use(VueI18n)

const i18n = new VueI18n({
  messages: {}
})

const DEFAULT_LOCALE = localStorage.getItem('language') || 'en'
const loadedLanguages = []
const locales = [
  'en'
]

const links = {
  en
}

const loadLanguage = lang => Promise.resolve(links[lang])

const ensureLoadLanguage = (lang) => {
  if (!loadedLanguages.includes(lang)) {
    return loadLanguage(lang).then((messages) => {
      i18n.mergeLocaleMessage(lang, messages)
      loadedLanguages.push(lang)

      return lang
    })
  }

  return Promise.resolve(lang)
}

const persistLanguage = (lang) => {
  localStorage.setItem('language', lang)
  i18n.locale = lang
}

const setLanguage = (lang = DEFAULT_LOCALE) => ensureLoadLanguage(lang).then(persistLanguage)

export {
  i18n,
  setLanguage,
  locales,
  DEFAULT_LOCALE
}
