import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks.ts'

interface ProtectedRouteProps {
    children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
    const onboardingCompleted = useAppSelector((state) => state.onboarding.completed)

    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate("/login", { replace: true })
    }
    if (!onboardingCompleted) {
        navigate("/onboarding", { replace: true })
    }

    return children
}
