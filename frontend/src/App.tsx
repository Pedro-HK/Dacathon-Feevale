import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CurriculumMapPage from './pages/CurriculumMapPage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { ProtectedRoute } from '@/shared/ui/ProtectedRoute'
import { DashboardPage } from '@/pages/DashboardPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/mapa-disciplinas" element={
          <ProtectedRoute>
            <CurriculumMapPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App