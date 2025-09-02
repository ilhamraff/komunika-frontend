import z from "zod";

export const signUpSchema = z.object({
  photo: z.any().refine((file: File) => file?.type?.startsWith("image/"), {
    message: "File must be an image",
  }),
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const signInSchema = signUpSchema.pick({
  email: true,
  password: true,
});

export const forgotPasswordSchema = signUpSchema.pick({
  email: true,
});

export type SignUpValues = z.infer<typeof signUpSchema>;
export type SignInValues = z.infer<typeof signInSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
