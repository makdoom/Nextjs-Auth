"use server";

import { LoginSchema, LoginSchemaType } from "@/schemas";

export const login = async (values: LoginSchemaType) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: 0, message: "Invalid payload provided" };

  return { success: 1, message: "Verification email sent to your email id" };
};
