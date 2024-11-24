import { z } from "zod";

export const SignupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*\W)/, {
        message:
          "Password must contain at least one uppercase letter, one number, and one special character",
      }),
    role: z.enum(["CLIENT", "CREATOR"]).optional().default("CLIENT"),
  });
  
export type SignupFormInputs = z.infer<typeof SignupSchema>;