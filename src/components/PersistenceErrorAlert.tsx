import { useSyncExternalStore } from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { PageContainer as Container } from './layout/PageContainer'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import {
  getPersistenceFailureSnapshot,
  subscribeToPersistenceFailures,
} from '../app/store/persistence/persistenceStorage'

export function PersistenceErrorAlert() {
  const { t } = useTranslation()
  const failure = useSyncExternalStore(
    subscribeToPersistenceFailures,
    getPersistenceFailureSnapshot,
    getPersistenceFailureSnapshot,
  )

  if (!failure) {
    return null
  }

  const isWriteFailure = failure.operation === 'write'

  return (
    <Container sx={{ pt: 2 }}>
      <Alert severity="error">
        <AlertTitle>
          {isWriteFailure
            ? t('persistence.writeTitle')
            : t('persistence.readTitle')}
        </AlertTitle>
        {t('persistence.description')}
        <Typography variant="caption" component="p" sx={{ mt: 0.5 }}>
          {failure.message}
        </Typography>
      </Alert>
    </Container>
  )
}
