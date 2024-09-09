import prisma from "@/lib/db";

export const createTwoFactorToken = async (
  email: string,
  newToken: string,
  expires: Date
) => {
  try {
    const generatedToken = await prisma.twoFactorToken.create({
      data: { email, token: newToken, expires },
    });
    return generatedToken;
  } catch (error) {
    throw error;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const token = await prisma.twoFactorToken.findFirst({
      where: { email },
    });
    return token;
  } catch (error) {
    throw error;
  }
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFactorToken;
  } catch (error) {
    throw error;
  }
};

export const deleteTwoFactorToken = async (id: string) => {
  try {
    await prisma.twoFactorToken.delete({
      where: { id },
    });
  } catch (error) {
    throw error;
  }
};
