import {
    updatePayment,
    updateProfile,
    updateSongs,
} from "../../store/slices/onboardingSlice";
import type { AppDispatch } from "../../store/store";

import type { OnboardingFormValues, OnboardingStep } from "./types";
import {
    paymentValidationSchema,
    profileValidationSchema,
    songsValidationSchema,
} from "./validationSchema";

export const persistCurrentStep = (
    currentStep: OnboardingStep,
    values: OnboardingFormValues,
    dispatch: AppDispatch,
) => {
    switch (currentStep) {
        case 1:
            dispatch(updateProfile(values.profile));
            break;

        case 2:
            dispatch(
                updateSongs(
                    values.favoriteSongs.length > 0 ? values.favoriteSongs : [""],
                ),
            );
            break;

        case 3:
            dispatch(updatePayment(values.payment));
            break;
    }
};

export const getValidationSchema = (step: OnboardingStep) => {
    switch (step) {
        case 1:
            return profileValidationSchema;

        case 2:
            return songsValidationSchema;

        case 3:
            return paymentValidationSchema;

        default:
            return undefined;
    }
};
