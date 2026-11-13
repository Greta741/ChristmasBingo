import type { Language } from '../../domain/models'

export function getDeviceLanguage(): Language {
  if (typeof navigator === 'undefined') {
    return 'en'
  }

  const deviceLanguage = navigator.languages?.[0] ?? navigator.language
  const normalisedLanguage = deviceLanguage?.toLowerCase()

  return normalisedLanguage === 'lt' || normalisedLanguage?.startsWith('lt-')
    ? 'lt'
    : 'en'
}
