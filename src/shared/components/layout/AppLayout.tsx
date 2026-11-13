import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { Outlet } from 'react-router'
import { AppHeader } from './AppHeader'
import { AppFooter } from './AppFooter'

export function AppLayout() {
  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <Link
        href="#main-content"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main-content')?.focus()
        }}
        sx={{
          position: 'fixed',
          top: 8,
          left: 8,
          p: 1.5,
          bgcolor: 'background.paper',
          zIndex: 'tooltip',
          transform: 'translateY(-200%)',
          '&:focus': { transform: 'translateY(0)' },
        }}
      >
        Pereiti prie turinio
      </Link>
      <AppHeader />
      <Container
        component="main"
        id="main-content"
        tabIndex={-1}
        maxWidth="md"
        sx={{ flex: 1, py: 3 }}
      >
        <Outlet />
      </Container>
      <AppFooter />
    </Box>
  )
}
