import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router'
import { ChristmasHero } from './components/ChristmasHero'

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
      <ChristmasHero />
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
