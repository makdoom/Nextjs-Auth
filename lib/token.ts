import {
  createResetPasswordToken,
  deleteResetPasswordToken,
  getResetPasswordTokenByEmail,
} from "@/data/passwordResetToken";
import {
  createVerificationToken,
  deleteVerificationToken,
  getVerificationTokenByEmail,
} from "@/data/verificationToken";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  try {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
      await deleteVerificationToken(existingToken.id);
    }

    const generatedToken = await createVerificationToken(email, token, expires);
    return generatedToken;
  } catch (error) {
    throw error;
  }
};

export const generateResetPasswordToken = async (email: string) => {
  try {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getResetPasswordTokenByEmail(email);
    if (existingToken) {
      await deleteResetPasswordToken(existingToken.id);
    }

    const generatedToken = await createResetPasswordToken(
      email,
      token,
      expires
    );
    return generatedToken;
  } catch (error) {
    throw error;
  }
};
