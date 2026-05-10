export interface OnboardingFormValues {
    profile: {
        name: string
        age: string
        email: string
        profilePicture: string
    }

    favoriteSongs: string[]

    payment: {
        cardNumber: string
        expiryDate: string
        cvv: string
    }
}

export type OnboardingStep = 1 | 2 | 3 | 4