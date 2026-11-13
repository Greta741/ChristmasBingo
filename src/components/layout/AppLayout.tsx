import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation } from 'react-router'
import { PersistenceErrorAlert } from '../PersistenceErrorAlert'
import { AppHeader } from './AppHeader'
import { AppFooter } from './AppFooter'

const SkipLink = styled(Link)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(1),
  left: theme.spacing(1),
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.paper,
  zIndex: theme.zIndex.tooltip,
  transform: 'translateY(-200%)',
  '&:focus': { transform: 'translateY(0)' },
}))

const MainContainer = styled(Container, {
  shouldForwardProp: (prop) => prop !== 'isCreate' && prop !== 'fullBleed',
})<{ isCreate: boolean; fullBleed: boolean }>(
  ({ isCreate, fullBleed, theme }) => ({
    maxWidth: fullBleed ? 'none' : 1440,
    flex: 1,
    paddingTop: fullBleed ? 0 : theme.spacing(3),
    paddingBottom: isCreate ? 0 : theme.spacing(3),
    ...(isCreate && {
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: 0,
    }),
  }),
)

export function AppLayout() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const fullWidth = pathname === '/' || pathname === '/create'

  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <SkipLink
        href="#main-content"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main-content')?.focus()
        }}
      >
        {t('app.skipToContent')}
      </SkipLink>
      <AppHeader />
      <PersistenceErrorAlert />
      <MainContainer
        as="main"
        isCreate={pathname === '/create'}
        fullBleed={fullWidth}
        id="main-content"
        tabIndex={-1}
        maxWidth={false}
        disableGutters={fullWidth}
      >
        <Outlet />
      </MainContainer>
      <AppFooter />
    </Box>
  )
}
