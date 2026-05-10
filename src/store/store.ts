import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/authSlice.ts'
import { onboardingReducer } from './slices/onboardingSlice.ts'
import { loadPersistedState, savePersistedState } from './persistence.ts'

const rootReducer = combineReducers({
  auth: authReducer,
  onboarding: onboardingReducer,
})

const preloadedState = loadPersistedState()

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
})

store.subscribe(() => {
  const state = store.getState()

  savePersistedState({
    auth: state.auth,
    onboarding: state.onboarding,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
