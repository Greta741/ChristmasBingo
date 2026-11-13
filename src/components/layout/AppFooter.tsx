import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

export function AppFooter() {
  const { t } = useTranslation()

  return (
    <Box
      component="footer"
      sx={{ py: 1.5, borderTop: 1, borderColor: 'divider' }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" color="text.secondary">
          {t('app.footer')}
        </Typography>
      </Container>
    </Box>
  )
}
