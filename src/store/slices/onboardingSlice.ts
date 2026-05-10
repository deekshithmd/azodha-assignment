import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type {
  OnboardingState,
  OnboardingStep,
  PaymentInfo,
  ProfileInfo,
} from '../types.ts'

const initialState: OnboardingState = {
  currentStep: 1,
  completed: false,
  profile: {
    name: '',
    age: '',
    email: '',
    profilePicture: '',
  },
  favoriteSongs: [''],
  payment: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  },
}

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<OnboardingStep>) => {
      state.currentStep = action.payload
    },
    updateProfile: (state, action: PayloadAction<ProfileInfo>) => {
      state.profile = action.payload
    },
    updateSongs: (state, action: PayloadAction<string[]>) => {
      state.favoriteSongs = action.payload.length > 0 ? action.payload : ['']
    },
    updatePayment: (state, action: PayloadAction<PaymentInfo>) => {
      state.payment = action.payload
    },
    completeOnboarding: (state) => {
      state.completed = true
      state.currentStep = 4
    },
    resetOnboarding: () => initialState,
  },
})

export const {
  setCurrentStep,
  updateProfile,
  updateSongs,
  updatePayment,
  completeOnboarding,
  resetOnboarding,
} = onboardingSlice.actions
export const onboardingReducer = onboardingSlice.reducer
