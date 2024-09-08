"use server";

import { getUserByEmail } from "@/data/user";
import prisma from "@/lib/db";
import { sendMail } from "@/lib/mail";
import { generateToken } from "@/lib/token";
import { RegisterSchema, RegisterSchemaType } from "@/schemas";
import bcrypt from "bcryptjs";

export const register = async (values: RegisterSchemaType) => {
  try {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success)
      return { success: 0, message: "Invalid payload provided" };

    const { name, email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (existingUser) return { success: 0, message: "Email is already taken" };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const verificationToken = await generateToken(email);
    await sendMail(name, verificationToken.email, verificationToken.token);

    // TODO: Send verification email to user
    return {
      success: 1,
      message: "Email Confirmation",
      data: newUser,
    };
  } catch (error) {
    return {
      success: 0,
      message:
        error instanceof Error
          ? error?.message
          : "Something went wrong while creating user",
      data: null,
    };
  }
};
