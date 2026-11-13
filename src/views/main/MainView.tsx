import AddRoundedIcon from '@mui/icons-material/AddRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router'
import { PageHeader } from '../../shared/components/layout/PageHeader'

export function MainView() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const showHistory = searchParams.get('section') === 'history'

  useEffect(() => {
    if (showHistory) {
      const history = document.getElementById('card-history')
      history?.scrollIntoView({ block: 'start' })
    }
  }, [showHistory, location.key])

  return (
    <>
      <PageHeader
        title="Kalėdinis bingo"
        description="Paversk pasivaikščiojimą mažais kalėdiniais atradimais. Rask dekoracijas ir surink savo bingo."
      />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        sx={{ mb: 2.5 }}
      >
        <Button
          component={Link}
          to="/create"
          variant="contained"
          startIcon={<AddRoundedIcon />}
        >
          Kurti
        </Button>
        <Button
          component={Link}
          to="/play/1"
          variant="outlined"
          color="secondary"
          startIcon={<PlayArrowRoundedIcon />}
        >
          Žaisti
        </Button>
      </Stack>
      <Paper
        component="section"
        id="card-history"
        aria-labelledby="history-heading"
        variant="outlined"
        sx={{ p: 2.5 }}
      >
        <Typography
          id="history-heading"
          component="h2"
          variant="h2"
          sx={{ mb: 1 }}
        >
          Mano kortelės
        </Typography>
        <Typography color="text.secondary">
          Dar neturi sukurtų kortelių.
        </Typography>
      </Paper>
    </>
  )
}
