import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.tsx'
import { LocalizationGate } from './app/localization/LocalizationGate'
import { getDeviceLanguage } from './app/localization/language'
import { persistor, store } from './app/store'
import { theme } from './app/theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PersistGate
          persistor={persistor}
          loading={
            <Stack
              role="status"
              sx={{
                minHeight: '100dvh',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography>
                {getDeviceLanguage() === 'lt' ? 'Kraunama…' : 'Loading…'}
              </Typography>
            </Stack>
          }
        >
          <LocalizationGate>
            <App />
          </LocalizationGate>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
