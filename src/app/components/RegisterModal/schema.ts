import { z } from "zod";

function isValidPhoneNumber(value: string) {
    return /^(\+40\d{9}|07\d{8})$/.test(value);
}

const schema = z
    .object({
        firstName: z
            .string({
                required_error: "Please enter your first name",
            })
            .min(2, "First name must be at least 2 characters")
            .max(100, "First name must contain at most 100 characters"),
        lastName: z
            .string({
                required_error: "Please enter your last name",
            })
            .min(2, "Last name must be at least 2 characters")
            .max(100, "Last name must contain at most 100 characters"),
        phone: z
            .string()
            .max(12, "Phone must contain at most 12 digits")
            .refine((value) => isValidPhoneNumber(value), {
                message: "Phone number is invalid",
            }),
        email: z
            .string({
                required_error: "Please enter your email",
            })
            .email("Please enter a valid email"),
        password: z
            .string({
                required_error: "Please enter your password",
            })
            .min(8, "Password must be at least 8 characters")
            .max(100, "Password must contain at most 100 characters"),
        confirmPassword: z
            .string({
                required_error: "Please enter your password",
            })
            .min(8, "Password must be at least 8 characters")
            .max(100, "Password must contain at most 100 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password doesn't match",
        path: ["confirmpassword"],
    });

export default schema;
