import { useSyncExternalStore } from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import {
  getPersistenceFailureSnapshot,
  subscribeToPersistenceFailures,
} from '../app/store/persistence/persistenceStorage'

export function PersistenceErrorAlert() {
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
    <Container maxWidth="md" sx={{ pt: 2 }}>
      <Alert severity="error">
        <AlertTitle>
          {isWriteFailure
            ? 'Nepavyko išsaugoti duomenų'
            : 'Nepavyko perskaityti išsaugotų duomenų'}
        </AlertTitle>
        Naršyklėje buvę duomenys nebuvo ištrinti. Kol klaida neišspręsta, nauji
        pakeitimai nebus išsaugomi.
        <Typography variant="caption" component="p" sx={{ mt: 0.5 }}>
          {failure.message}
        </Typography>
      </Alert>
    </Container>
  )
}
