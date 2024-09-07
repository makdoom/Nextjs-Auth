"use server";

import { RegisterSchema, RegisterSchemaType } from "@/schemas";

export const register = async (values: RegisterSchemaType) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: 0, message: "Invalid payload provided" };

  return { success: 1, message: "Verification email sent to your email id" };
};
