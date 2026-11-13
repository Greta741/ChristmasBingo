import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import i18n from '../../app/localization/i18n'
import { getDeviceLanguage } from '../../app/localization/language'
import { setLanguagePreference } from '../../app/store/appStateSlice'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import type { Language } from '../../domain/models'

interface LanguageSelectorProps {
  fullWidth?: boolean
}

const LanguageControl = styled(FormControl)(({ theme }) => ({
  justifyContent: 'center',
  minHeight: 44,
  marginTop: 0,
  '& .MuiInputBase-root': {
    color: 'inherit',
    fontSize: theme.typography.button.fontSize,
    fontWeight: theme.typography.button.fontWeight,
  },
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    minHeight: '44px !important',
    padding: '0 28px 0 12px !important',
    borderRadius: theme.shape.borderRadius,
  },
  '& .MuiSelect-select:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  '& .MuiSelect-icon': { color: 'inherit', right: 4 },
}))

export function LanguageSelector({ fullWidth = false }: LanguageSelectorProps) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const persistedLanguage = useAppSelector((state) => state.language)
  const language = persistedLanguage ?? getDeviceLanguage()

  const handleLanguageChange = (event: SelectChangeEvent<Language>) => {
    const selectedLanguage = event.target.value as Language
    void i18n.changeLanguage(selectedLanguage)
    dispatch(setLanguagePreference(selectedLanguage))
  }

  return (
    <LanguageControl
      size="small"
      variant="standard"
      fullWidth={fullWidth}
      sx={{ minWidth: fullWidth ? '100%' : 72 }}
    >
      <Select<Language>
        value={language}
        onChange={handleLanguageChange}
        disableUnderline
        inputProps={{ 'aria-label': t('language.label') }}
        renderValue={(value) => value.toUpperCase()}
      >
        <MenuItem value="lt">{t('language.lt')}</MenuItem>
        <MenuItem value="en">{t('language.en')}</MenuItem>
      </Select>
    </LanguageControl>
  )
}
