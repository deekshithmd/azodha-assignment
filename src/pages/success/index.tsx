import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../store/hooks.ts'

export function SuccessPage() {
    const navigate = useNavigate()
    const username = useAppSelector((state) => state.auth.username)

    return (
        <section className="page">
            <div className="card">
                <h1>Success</h1>
                <p className="subtitle">
                    Onboarding completed successfully{username ? `, ${username}` : ''}.
                </p>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => navigate('/home', { replace: true })}
                >
                    Go to Home
                </button>
            </div>
        </section>
    )
}
