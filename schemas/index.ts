import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email id" }),
  password: z.string().min(1, { message: "Password is required" }),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Enter a valid email id" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long" }),
});
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
