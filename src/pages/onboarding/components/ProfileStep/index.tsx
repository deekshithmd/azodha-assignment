import { ErrorMessage, Field } from 'formik'

interface Props {
    setFieldValue: (field: string, value: unknown) => void
}

export function ProfileStep({ setFieldValue }: Props) {
    return (
        <>
            <label className="field">
                <span>Name</span>
                <Field type="text" name="profile.name" />
                <ErrorMessage
                    name="profile.name"
                    component="small"
                    className="error"
                />
            </label>

            <label className="field">
                <span>Age</span>
                <Field
                    type="text"
                    inputMode="numeric"
                    name="profile.age"
                />
                <ErrorMessage
                    name="profile.age"
                    component="small"
                    className="error"
                />
            </label>

            <label className="field">
                <span>Email</span>
                <Field type="email" name="profile.email" />
                <ErrorMessage
                    name="profile.email"
                    component="small"
                    className="error"
                />
            </label>

            <label className="field">
                <span>Upload Profile Picture</span>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        const file =
                            event.currentTarget.files?.[0]

                        void setFieldValue(
                            'profile.profilePicture',
                            file ? file.name : '',
                        )
                    }}
                />

                <ErrorMessage
                    name="profile.profilePicture"
                    component="small"
                    className="error"
                />
            </label>
        </>
    )
}