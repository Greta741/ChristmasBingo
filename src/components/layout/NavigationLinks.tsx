import AddRoundedIcon from '@mui/icons-material/AddRounded'
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router'
import { LanguageSelector } from './LanguageSelector'

interface NavigationLinksProps {
  vertical?: boolean
  onNavigate?: () => void
}

const NavigationStack = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'vertical',
})<{ vertical: boolean }>(({ vertical, theme }) => ({
  alignItems: vertical ? 'stretch' : 'center',
  '& .MuiButton-root': {
    justifyContent: vertical ? 'flex-start' : 'center',
    color: theme.palette.primary.contrastText,
  },
  '& .MuiButton-root:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
}))

export function NavigationLinks({
  vertical = false,
  onNavigate,
}: NavigationLinksProps) {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const createActive = pathname === '/create'

  return (
    <NavigationStack
      as="nav"
      vertical={vertical}
      aria-label={t('navigation.label')}
      direction={vertical ? 'column' : 'row'}
      spacing={0.5}
    >
      <Button
        component={Link}
        to="/create"
        onClick={onNavigate}
        startIcon={<AddRoundedIcon />}
        fullWidth={vertical}
        aria-current={createActive ? 'page' : undefined}
        sx={{
          ...(createActive && {
            bgcolor: 'rgba(255, 255, 255, 0.18)',
            color: 'primary.contrastText',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.24)',
            },
          }),
        }}
      >
        {t('navigation.create')}
      </Button>
      <Button
        component={Link}
        to="/?section=history"
        onClick={onNavigate}
        startIcon={<HistoryRoundedIcon />}
        fullWidth={vertical}
      >
        {t('navigation.history')}
      </Button>
      <Button
        component={Link}
        to="/play/1"
        onClick={onNavigate}
        startIcon={<PlayArrowRoundedIcon />}
        fullWidth={vertical}
      >
        {t('navigation.play')}
      </Button>
      <LanguageSelector fullWidth={vertical} />
    </NavigationStack>
  )
}
