import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { HashRouter, Navigate, Route, Routes } from 'react-router'
import { theme } from './app/theme'
import { AppLayout } from './shared/components/layout/AppLayout'
import { CreateView } from './views/create/CreateView'
import { MainView } from './views/main/MainView'
import { PlayView } from './views/play/PlayView'
import { PrintView } from './views/print/PrintView'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<MainView />} />
            <Route path="create" element={<CreateView />} />
            <Route path="play/:id" element={<PlayView />} />
            <Route path="print" element={<PrintView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
