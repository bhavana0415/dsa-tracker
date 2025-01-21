import * as z from "zod";

export const userAuthSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export const userNameSchema = z.object({
    firstname: z.string().min(1, "First name should not be empty."),
    lastname: z.string().min(1, "Last name should not be empty."),
});

export const userDetailsSchema = z.object({
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits.")
        .regex(/^[0-9]+$/, "Phone number must only contain digits."),
    linkedin: z
        .string()
        .regex(
            /^https?:\/\/(www\.)?linkedin\.com\/in\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\/?$/,
            "Invalid LinkedIn profile link."
        ),
    location: z.string(),
});

export const userEmailSchema = z.object({
    email: z.string().email("Invalid email address."),
});

export const verificationCodeSchema = z.object({
    email: z.string().email("Invalid email address."),
    code: z.string().min(6, "Invalid code."),
});

export const userRegisterSchema = z.object({
    email: z.string().email("Invalid email address."),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
        .regex(/[a-z]/, "Password must include at least one lowercase letter.")
        .regex(/[0-9]/, "Password must include at least one number.")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include at least one special character."),
    confirmPassword: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
        .regex(/[a-z]/, "Password must include at least one lowercase letter.")
        .regex(/[0-9]/, "Password must include at least one number.")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include at least one special character."),
}).refine(data => data.password === data.confirmPassword, {
    message: "The passwords must match.",
    path: ["confirmPassword"],
})
