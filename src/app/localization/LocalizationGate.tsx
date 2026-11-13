import { useEffect, useState, type ReactNode } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { setLanguagePreference } from '../store/appStateSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import i18n from './i18n'
import { getDeviceLanguage } from './language'

interface LocalizationGateProps {
  children: ReactNode
}

export function LocalizationGate({ children }: LocalizationGateProps) {
  const dispatch = useAppDispatch()
  const persistedLanguage = useAppSelector((state) => state.language)
  const [initialised, setInitialised] = useState(false)
  const language = persistedLanguage ?? getDeviceLanguage()

  useEffect(() => {
    let active = true

    async function applyLanguage() {
      await i18n.changeLanguage(language)

      if (!active) {
        return
      }

      document.documentElement.lang = language
      document.title = i18n.t('app.name')

      if (persistedLanguage === null) {
        dispatch(setLanguagePreference(language))
      }

      setInitialised(true)
    }

    void applyLanguage()

    return () => {
      active = false
    }
  }, [dispatch, language, persistedLanguage])

  if (!initialised) {
    return (
      <Stack
        role="status"
        sx={{
          minHeight: '100dvh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography>{language === 'lt' ? 'Kraunama…' : 'Loading…'}</Typography>
      </Stack>
    )
  }

  return children
}
