import { z } from "zod"

const schema = z.object({
    email: z.string({
        required_error: "Please enter your email"
    }).email("Please enter a valid email"),
    password: z.string({
        required_error: "Please enter your password"
    }).min(8, 'Password must be at least 8 characters'),
})

export default schema;