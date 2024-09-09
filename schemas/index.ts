import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.optional(z.string()),
});

export const TwoFactorSchema = z.object({
  email: z
    .string()
    .email({ message: "Enter a valid email address" })
    .optional(),
  password: z.string().optional(),
  code: z.string().min(1, { message: "2FA Code is required" }), // Required in the second step
});

export const CombinedSchema = z.union([LoginSchema, TwoFactorSchema]);

export type LoginSchemaType = z.infer<typeof CombinedSchema>;

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Enter a valid email id" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const ResetPasswordSchema = z.object({
  email: z.string().email({ message: "Enter a valid email id" }),
});
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>;
