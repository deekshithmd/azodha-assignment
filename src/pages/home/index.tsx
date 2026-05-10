import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts'
import { logout } from '../../store/slices/authSlice.ts'
import { clearPersistedState } from '../../store/persistence.ts'
import { resetOnboarding } from '../../store/slices/onboardingSlice.ts'

export function HomePage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { username } = useAppSelector((state) => state.auth)
    const { profile } = useAppSelector((state) => state.onboarding)

    const handleLogout = () => {
        dispatch(logout())
        dispatch(resetOnboarding())
        clearPersistedState()
        navigate('/login', { replace: true })
    }

    return (
        <section className="page">
            <div className="card">
                <h1>Home</h1>
                <p className="subtitle">
                    Welcome {profile.name || username || 'User'}! Your onboarding is complete.
                </p>
                <button type="button" className="btn btn-secondary" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </section>
    )
}
