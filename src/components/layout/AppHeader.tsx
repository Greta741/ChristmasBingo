import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router'
import { MobileMenu } from './MobileMenu'
import { NavigationLinks } from './NavigationLinks'

export function AppHeader() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      component="header"
      sx={{
        bgcolor: 'primary.main',
        backgroundImage: 'linear-gradient(110deg, #134b38, #1d6048)',
        color: 'primary.contrastText',
      }}
    >
      <Container maxWidth="md">
        <Stack
          direction="row"
          spacing={1}
          sx={{ py: 1, alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Link
            component={RouterLink}
            to="/"
            underline="none"
            color="inherit"
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}
          >
            <Box
              component="img"
              src={import.meta.env.BASE_URL + 'logo.svg'}
              alt=""
              width={44}
              height={44}
              sx={{ display: 'block', objectFit: 'contain', flexShrink: 0 }}
            />
            <Typography
              component="span"
              sx={{ fontWeight: 750, fontSize: '0.95rem' }}
            >
              Kalėdinis bingo
            </Typography>
          </Link>
          {isMobile ? <MobileMenu /> : <NavigationLinks />}
        </Stack>
      </Container>
    </Box>
  )
}
