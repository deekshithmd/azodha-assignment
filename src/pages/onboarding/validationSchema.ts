import * as Yup from "yup";

export const profileValidationSchema = Yup.object({
    profile: Yup.object({
        name: Yup.string().required("Name is required"),
        age: Yup.string()
            .matches(/^\d+$/, "Age must be a number")
            .required("Age is required"),
        email: Yup.string()
            .email("Enter a valid email address")
            .required("Email is required"),
        profilePicture: Yup.string().required("Profile picture is required"),
    }),
});

export const songsValidationSchema = Yup.object({
    favoriteSongs: Yup.array()
        .of(Yup.string().trim().required("Song title cannot be empty"))
        .min(1, "Add at least one favorite song"),
});

export const paymentValidationSchema = Yup.object({
    payment: Yup.object({
        cardNumber: Yup.string()
            .matches(/^\d{16}$/, "Card number must be 16 digits")
            .required("Card number is required"),

        expiryDate: Yup.string()
            .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format")
            .required("Expiry date is required"),

        cvv: Yup.string()
            .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
            .required("CVV is required"),
    }),
});
