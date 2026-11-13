import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { PageHeader } from '../../components/layout/PageHeader'

export function PrintView() {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader
        title={t('print.title')}
        description={t('print.description')}
      />
      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {t('print.empty')}
        </Typography>
        <Button component={Link} to="/create" variant="contained">
          {t('print.create')}
        </Button>
      </Paper>
    </>
  )
}
