import { ErrorMessage, Field, FieldArray, type FormikErrors } from "formik";

import type { OnboardingFormValues } from '../../types';

interface Props {
    values: OnboardingFormValues;
    errors: FormikErrors<OnboardingFormValues>;
}

export function SongsStep({ values, errors }: Props) {
    return (
        <FieldArray name="favoriteSongs">
            {({ push, remove }) => (
                <div className="song-list">
                    {values.favoriteSongs.map((_, index) => (
                        <label className="field" key={`song-${index}`}>
                            <span>Song {index + 1}</span>

                            <div className="inline-group">
                                <Field
                                    type="text"
                                    name={`favoriteSongs.${index}`}
                                    placeholder="Enter song title"
                                />

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => remove(index)}
                                    disabled={values.favoriteSongs.length === 1}
                                >
                                    Remove
                                </button>
                            </div>

                            <ErrorMessage
                                name={`favoriteSongs.${index}`}
                                component="small"
                                className="error"
                            />
                        </label>
                    ))}

                    {typeof errors.favoriteSongs === "string" && (
                        <p className="error-text">{errors.favoriteSongs}</p>
                    )}

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => push("")}
                    >
                        Add Song
                    </button>
                </div>
            )}
        </FieldArray>
    );
}
