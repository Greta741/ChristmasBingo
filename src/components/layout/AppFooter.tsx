import Box from '@mui/material/Box'
import { PageContainer as Container } from './PageContainer'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

export function AppFooter() {
  const { t } = useTranslation()

  return (
    <Box
      component="footer"
      sx={{ py: 1.5, borderTop: 1, borderColor: 'divider' }}
    >
      <Container>
        <Typography variant="body2" color="text.secondary">
          {t('app.footer')}
        </Typography>
      </Container>
    </Box>
  )
}
