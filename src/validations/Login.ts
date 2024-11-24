import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });
  
export type LoginFormInputs = z.infer<typeof LoginSchema>;