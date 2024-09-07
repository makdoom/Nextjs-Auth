"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, LoginSchemaType } from "@/schemas";
import { AuthError } from "next-auth";

export const login = async (values: LoginSchemaType) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: 0, message: "Invalid payload provided" };

  try {
    const { email, password } = validatedFields.data;
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: 0, message: "Invalid credentials provided" };
        default:
          return {
            success: 0,
            message: "Something went wrong while signin user",
          };
      }
    }
    throw error;
  }
  return { success: 1, message: "Verification email sent to your email id" };
};
