"use server";

import { getUserByEmail } from "@/data/user";
import { sendResetPasswordMail } from "@/lib/mail";
import { generateResetPasswordToken } from "@/lib/token";
import { ResetPasswordSchema, ResetPasswordSchemaType } from "@/schemas";

export const resetPassword = async (values: ResetPasswordSchemaType) => {
  try {
    const validatedFields = ResetPasswordSchema.safeParse(values);

    if (!validatedFields.success)
      return { success: 0, message: "Invalid email provided" };

    const { email } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser)
      return { success: 0, message: "User with this email address not found" };

    const newResetPasswordToken = await generateResetPasswordToken(email);
    if (existingUser.name) {
      await sendResetPasswordMail(
        existingUser.name,
        newResetPasswordToken.email,
        newResetPasswordToken.token
      );
      console.log("email sent");
    }
    return { success: 1, message: "Reset Password Email" };
  } catch (error) {
    throw error;
  }
};
