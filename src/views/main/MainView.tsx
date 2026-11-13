import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useSearchParams } from 'react-router'
import { ChristmasHero } from './components/ChristmasHero'

export function MainView() {
  const { t } = useTranslation()
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
      <Container maxWidth="md">
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
            {t('history.title')}
          </Typography>
          <Typography color="text.secondary">{t('history.empty')}</Typography>
        </Paper>
      </Container>
    </>
  )
}
