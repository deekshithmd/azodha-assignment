interface Props {
    currentStep: number
}

export function StepIndicator({ currentStep }: Props) {
    return (
        <div className="step-indicator">
            {[1, 2, 3, 4].map((step) => (
                <span
                    key={step}
                    className={step <= currentStep ? 'step active' : 'step'}
                />
            ))}
        </div>
    )
}