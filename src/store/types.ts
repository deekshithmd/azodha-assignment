export type OnboardingStep = 1 | 2 | 3 | 4

export interface ProfileInfo {
  name: string
  age: string
  email: string
  profilePicture: string
}

export interface PaymentInfo {
  cardNumber: string
  expiryDate: string
  cvv: string
}

export interface AuthState {
  isAuthenticated: boolean
  username: string | null
}

export interface OnboardingState {
  currentStep: OnboardingStep
  completed: boolean
  profile: ProfileInfo
  favoriteSongs: string[]
  payment: PaymentInfo
}
