import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../store/hooks.ts'
import { login } from '../../store/slices/authSlice.ts'

import { USER_CREDENTIALS } from '../../constants/auth.ts'

interface LoginFormValues {
    username: string
    password: string
}

const initialValues: LoginFormValues = {
    username: '',
    password: '',
}

const loginValidationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
})

export function LoginPage() {
    const [loginError, setLoginError] = useState('')

    const { isAuthenticated } = useAppSelector((state) => state.auth)
    const { completed } = useAppSelector((state) => state.onboarding)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isAuthenticated) {
            navigate(completed ? '/home' : '/onboarding', { replace: true })
        }
    }, [completed, isAuthenticated, navigate])

    const handleLoginValidation = (values: LoginFormValues) => {
        const isValidLogin =
            values.username === USER_CREDENTIALS.username &&
            values.password === USER_CREDENTIALS.password

        if (!isValidLogin) {
            setLoginError('Invalid credentials. Please try again.')
            return
        }

        setLoginError('')
        dispatch(login(values.username))
        navigate('/onboarding', { replace: true })
    }

    return (
        <section className="page">
            <div className="card">
                <h1>Login</h1>
                <p className="subtitle">Use username: user123 and password: password123</p>
                <Formik
                    initialValues={initialValues}
                    validationSchema={loginValidationSchema}
                    onSubmit={handleLoginValidation}
                >
                    {({ errors, touched, getFieldProps }) => (
                        <Form className="form">
                            <label className="field">
                                <span>Username</span>
                                <input
                                    type="text"
                                    placeholder="Enter username"
                                    {...getFieldProps('username')}
                                />
                                {touched.username && errors.username && (
                                    <small className="error">{errors.username}</small>
                                )}
                            </label>

                            <label className="field">
                                <span>Password</span>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    {...getFieldProps('password')}
                                />
                                {touched.password && errors.password && (
                                    <small className="error">{errors.password}</small>
                                )}
                            </label>

                            {loginError && <p className="error-text">{loginError}</p>}

                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    )
}
