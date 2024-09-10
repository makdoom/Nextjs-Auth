"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendTwoFactorTokenEmail } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, LoginSchemaType } from "@/schemas";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import {
  deleteTwoFactorToken,
  getTwoFactorTokenByEmail,
} from "@/data/twoFactorToken";
import {
  createTwoFactorConfirmation,
  deleteTwoFactorConfirmation,
  getTwoFactorConfirmationByUserId,
} from "@/data/twoFactorConfirmation";

export const login = async (values: LoginSchemaType) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success)
    return { success: 0, message: "Invalid payload provided" };

  try {
    const { email, password, code } = validatedFields.data;
    if (!email)
      return { success: 0, message: "Please provide valid email address" };
    if (!password)
      return { success: 0, message: "Please provide valid password" };

    const existingUser = await getUserByEmail(email);
    if (!existingUser)
      return {
        success: 0,
        message: "Account not found with this email address",
      };
    console.log("user exists", existingUser);
    if (!existingUser?.emailVerified) {
      await generateVerificationToken(email);
      return { success: 1, message: "Email Confirmation" };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );
        if (!twoFactorToken)
          return {
            success: 0,
            message: "Invalid two factor token",
          };

        if (twoFactorToken.token !== code)
          return {
            success: 0,
            message: "Incorrect authentication code, Please try again",
          };

        if (new Date(twoFactorToken.expires) < new Date())
          return {
            success: 0,
            message: "The authentication code has expired, Pleas try again",
          };

        await deleteTwoFactorToken(twoFactorToken.id);

        const existingConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.email
        );
        if (existingConfirmation) {
          await deleteTwoFactorConfirmation(existingConfirmation.id);
        }

        await createTwoFactorConfirmation(existingUser.id);
      } else {
        if (existingUser.password) {
          const isPasswordMatched = await bcrypt.compare(
            password,
            existingUser?.password
          );

          if (!isPasswordMatched)
            return {
              success: 0,
              message: "Your email or password is incorrect, Please try again",
            };
        }

        const generatedTwoFactorToken = await generateTwoFactorToken(
          existingUser.email
        );
        await sendTwoFactorTokenEmail(
          generatedTwoFactorToken.email,
          generatedTwoFactorToken.token
        );

        return {
          success: 1,
          twoFactor: true,
          message: "Two Factor Confirmation",
        };
      }
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: 1, message: "Loggedin successfully" };
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
};
