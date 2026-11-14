import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { AppLayout } from './components/layout/AppLayout'
import { CreateView } from './views/create/CreateView'
import { MainView } from './views/main/MainView'
import { PlayView } from './views/play/PlayView'
import { PrintView } from './views/print/PrintView'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<MainView />} />
          <Route path="create" element={<CreateView />} />
          <Route path="play/:id" element={<PlayView />} />
          <Route path="print" element={<PrintView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
