"use server";

import { getResetPasswordTokenByToken } from "@/data/passwordResetToken";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { NewPasswordSchema, NewPasswordSchemaType } from "@/schemas";
import prisma from "@/lib/db";

export const newPassword = async (
  values: NewPasswordSchemaType,
  token: string
) => {
  try {
    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success)
      return { success: 0, message: "Invalid email provided" };

    const { password } = validatedFields.data;
    const existingToken = await getResetPasswordTokenByToken(token);
    if (!existingToken) return { success: 0, message: "Token does not exists" };

    if (existingToken.expires < new Date())
      return { success: 0, message: "Token expired" };

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) return { success: 0, message: "User does not exists" };

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });

    await prisma.passwordResetToken.delete({ where: { id: existingToken.id } });
    return { success: 1, message: "Password updated successfully" };
  } catch (error) {
    throw error;
  }
};
