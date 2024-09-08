"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";
import prisma from "@/lib/db";

export const newVerification = async (token: string) => {
  try {
    console.log(token);
    const existingToken = await getVerificationTokenByToken(token);
    console.log(existingToken);
    if (!existingToken)
      return { succss: 0, message: "Token does not exists !" };

    if (existingToken.expires < new Date())
      return { succss: 0, message: "The token has expired !" };

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) return { succss: 0, message: "Email does not exists !" };

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { emailVerified: new Date(), email: existingToken.email },
    });

    await prisma.verificationToken.delete({ where: { id: existingToken.id } });
    return { success: 1, message: "Email verified successfully" };
  } catch (error) {
    throw error;
  }
};
