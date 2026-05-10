import type { AuthState, OnboardingState } from './types.ts'

const APP_STATE_STORAGE_KEY = 'app_state'

interface PersistedState {
  auth?: AuthState
  onboarding?: OnboardingState
}

export const loadPersistedState = (): PersistedState | undefined => {
  const storedData = localStorage.getItem(APP_STATE_STORAGE_KEY)
  if (!storedData) {
    return;
  }

  return JSON.parse(storedData) as PersistedState
}

export const savePersistedState = (state: PersistedState): void => {
  localStorage.setItem(APP_STATE_STORAGE_KEY, JSON.stringify(state))
}

export const clearPersistedState = (): void => {
  localStorage.removeItem(APP_STATE_STORAGE_KEY)
}
