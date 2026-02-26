import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  photo: z
    .instanceof(File, { message: "Photo is required" })
    .refine((file) => file.size > 0, "Photo is required"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
