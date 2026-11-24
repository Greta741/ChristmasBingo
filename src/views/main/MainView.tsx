import Box from '@mui/material/Box'
import { PageContainer as Container } from '../../components/layout/PageContainer'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useLocation, useSearchParams } from 'react-router'
import { ChristmasHero } from './components/ChristmasHero'
import { CardHistory } from './components/CardHistory'

export function MainView() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const showHistory = searchParams.get('section') === 'history'

  return (
    <>
      {!showHistory && <ChristmasHero />}
      <Container sx={{ px: { xs: 1, sm: 3 } }}>
        <Box
          component="section"
          id="card-history"
          aria-labelledby="history-heading"
          sx={{ pt: 2, pb: 3 }}
        >
          <Typography
            id="history-heading"
            component={showHistory ? 'h1' : 'h2'}
            variant={showHistory ? 'h1' : 'h2'}
            sx={{ mb: 1.5 }}
          >
            {t('history.title')}
          </Typography>
          <CardHistory key={location.key} />
        </Box>
      </Container>
    </>
  )
}
