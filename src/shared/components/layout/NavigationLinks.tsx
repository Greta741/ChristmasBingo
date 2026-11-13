import AddRoundedIcon from '@mui/icons-material/AddRounded'
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Link, useLocation } from 'react-router'

interface NavigationLinksProps {
  vertical?: boolean
  onNavigate?: () => void
}

export function NavigationLinks({
  vertical = false,
  onNavigate,
}: NavigationLinksProps) {
  const { pathname } = useLocation()
  const createActive = pathname === '/create'

  return (
    <Stack
      component="nav"
      aria-label="Pagrindinė navigacija"
      direction={vertical ? 'column' : 'row'}
      spacing={0.5}
      sx={{
        '& .MuiButton-root': {
          justifyContent: vertical ? 'flex-start' : 'center',
          color: 'primary.contrastText',
        },
        '& .MuiButton-root:hover': { bgcolor: 'rgba(255, 255, 255, 0.12)' },
      }}
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
        Kurti
      </Button>
      <Button
        component={Link}
        to="/?section=history"
        onClick={onNavigate}
        startIcon={<HistoryRoundedIcon />}
        fullWidth={vertical}
      >
        Istorija
      </Button>
      <Button
        component={Link}
        to="/play/1"
        onClick={onNavigate}
        startIcon={<PlayArrowRoundedIcon />}
        fullWidth={vertical}
      >
        Žaisti
      </Button>
    </Stack>
  )
}
