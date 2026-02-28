import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  photo: z
    .instanceof(File, { message: "Photo is required" })
    .refine((file) => file.size > 0, "Photo is required"),
});

export const signInSchema = signUpSchema.pick({
  email: true,
  password: true,
});

export const forgotPasswordSchema = signInSchema.pick({
  email: true,
});

export const updatePasswordSchema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignUpValues = z.infer<typeof signUpSchema>;
export type SignInValues = z.infer<typeof signInSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type UpdatePasswordValues = z.infer<typeof updatePasswordSchema>;
