import AddRoundedIcon from '@mui/icons-material/AddRounded'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router'
import { LanguageSelector } from './LanguageSelector'
import { useQuickPlay } from '../../hooks/useQuickPlay'

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
  const { startPlaying, starting, startError, clearError } = useQuickPlay()

  return (
    <>
      <NavigationStack
        as="nav"
        vertical={vertical}
        aria-label={t('navigation.label')}
        direction={vertical ? 'column' : 'row'}
        spacing={0.5}
      >
        <Button
          onClick={async () => {
            if (await startPlaying()) onNavigate?.()
          }}
          loading={starting}
          startIcon={<PlayArrowRoundedIcon />}
          fullWidth={vertical}
        >
          {t('navigation.play')}
        </Button>
        <Button
          component={Link}
          to="/?section=history"
          onClick={onNavigate}
          startIcon={<GridViewRoundedIcon />}
          fullWidth={vertical}
        >
          {t('navigation.history')}
        </Button>
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
        <LanguageSelector fullWidth={vertical} />
      </NavigationStack>
      <Snackbar open={startError} autoHideDuration={6000} onClose={clearError}>
        <Alert severity="error" onClose={clearError}>
          {t('hero.startError')}
        </Alert>
      </Snackbar>
    </>
  )
}
