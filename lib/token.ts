import {
  createVerificationToken,
  deleteToken,
  getVerificationTokenByEmail,
} from "@/data/verificationToken";
import { v4 as uuidv4 } from "uuid";

export const generateToken = async (email: string) => {
  try {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
      await deleteToken(existingToken.id);
    }

    const generatedToken = await createVerificationToken(email, token, expires);
    return generatedToken;
  } catch (error) {
    throw error;
  }
};
