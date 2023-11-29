import { z } from "zod";

const schema = z
    .object({
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
