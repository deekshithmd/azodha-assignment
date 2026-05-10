import { ErrorMessage, Field } from 'formik'

export function PaymentStep() {
    return (
        <>
            <label className="field">
                <span>Card Number</span>

                <Field
                    type="text"
                    name="payment.cardNumber"
                    maxLength={16}
                    inputMode="numeric"
                />

                <ErrorMessage
                    name="payment.cardNumber"
                    component="small"
                    className="error"
                />
            </label>

            <label className="field">
                <span>Expiry Date (MM/YY)</span>

                <Field
                    type="text"
                    name="payment.expiryDate"
                    placeholder="08/28"
                    maxLength={5}
                />

                <ErrorMessage
                    name="payment.expiryDate"
                    component="small"
                    className="error"
                />
            </label>

            <label className="field">
                <span>CVV</span>

                <Field
                    type="password"
                    name="payment.cvv"
                    maxLength={4}
                    inputMode="numeric"
                />

                <ErrorMessage
                    name="payment.cvv"
                    component="small"
                    className="error"
                />
            </label>
        </>
    )
}