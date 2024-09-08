import prisma from "@/lib/db";

export const createVerificationToken = async (
  email: string,
  newToken: string,
  expires: Date
) => {
  try {
    const generatedToken = await prisma.verificationToken.create({
      data: { email, token: newToken, expires },
    });
    return generatedToken;
  } catch (error) {
    throw error;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const token = await prisma.verificationToken.findFirst({
      where: { email },
    });
    return token;
  } catch (error) {
    throw error;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (error) {
    throw error;
  }
};

export const deleteToken = async (id: string) => {
  try {
    await prisma.verificationToken.delete({
      where: { id },
    });
  } catch (error) {
    throw error;
  }
};
