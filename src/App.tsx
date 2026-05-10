
import { Navigate, Route, Routes } from 'react-router-dom'

import { useAppSelector } from './store/hooks.ts'

import { LoginPage } from './pages/login'
import { OnboardingPage } from './pages/onboarding'
import { SuccessPage } from './pages/success'
import { HomePage } from './pages/home'
import { ProtectedRoute } from './components/ProtectedRoute'

import './App.css'

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const onboardingCompleted = useAppSelector((state) => state.onboarding.completed)

  return (
    <main className="app-container">
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={
                isAuthenticated
                  ? onboardingCompleted
                    ? '/home'
                    : '/onboarding'
                  : '/login'
              }
              replace
            />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <OnboardingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <SuccessPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  )
}

export default App
