import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Form, Formik, type FormikHelpers } from "formik";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
    completeOnboarding,
    setCurrentStep,
} from "../../store/slices/onboardingSlice";

import { PaymentStep } from "./components/PaymentStep";
import { ProfileStep } from "./components/ProfileStep";
import { SongsStep } from "./components/SongsStep";
import { StepIndicator } from "./components/StepIndicator";

import { getValidationSchema, persistCurrentStep } from "./onboardingHelpers";

import type { OnboardingFormValues, OnboardingStep } from "./types";

export function OnboardingPage() {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const onboarding = useAppSelector((state) => state.onboarding);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const currentStep = onboarding.currentStep;

    const initialValues: OnboardingFormValues = {
        profile: onboarding.profile,
        favoriteSongs: onboarding.favoriteSongs,
        payment: onboarding.payment,
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login", { replace: true });
            return;
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (
        values: OnboardingFormValues,
        helpers: FormikHelpers<OnboardingFormValues>,
    ) => {
        persistCurrentStep(currentStep, values, dispatch);
        if (currentStep === 3) {
            dispatch(completeOnboarding());

            navigate("/success", { replace: true });
            helpers.setSubmitting(false);
            return;
        }
        dispatch(setCurrentStep((currentStep + 1) as OnboardingStep));
        helpers.setSubmitting(false);
    };

    return (
        <section className="page">
            <div className="card wide">
                <h1>Onboarding</h1>
                <p className="subtitle">Step {currentStep} of 4</p>
                <StepIndicator currentStep={currentStep} />
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={getValidationSchema(currentStep)}
                    onSubmit={handleSubmit}
                >
                    {({ errors, isSubmitting, values, setFieldValue }) => (
                        <Form className="form">
                            {currentStep === 1 && (
                                <ProfileStep setFieldValue={setFieldValue} />
                            )}

                            {currentStep === 2 && (
                                <SongsStep values={values} errors={errors} />
                            )}

                            {currentStep === 3 && <PaymentStep />}

                            <div className="actions">
                                {currentStep > 1 && currentStep <= 3 && (
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            persistCurrentStep(currentStep, values, dispatch);

                                            dispatch(
                                                setCurrentStep((currentStep - 1) as OnboardingStep),
                                            );
                                        }}
                                    >
                                        Back
                                    </button>
                                )}
                                {currentStep <= 3 && (
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isSubmitting}
                                    >
                                        {currentStep === 3 ? "Complete Onboarding" : "Continue"}
                                    </button>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
}
