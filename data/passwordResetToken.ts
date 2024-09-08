import prisma from "@/lib/db";

export const createResetPasswordToken = async (
  email: string,
  newToken: string,
  expires: Date
) => {
  try {
    const generatedToken = await prisma.passwordResetToken.create({
      data: { email, token: newToken, expires },
    });
    return generatedToken;
  } catch (error) {
    throw error;
  }
};

export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    const token = await prisma.passwordResetToken.findFirst({
      where: { email },
    });
    return token;
  } catch (error) {
    throw error;
  }
};

export const getResetPasswordTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (error) {
    throw error;
  }
};

export const deleteResetPasswordToken = async (id: string) => {
  try {
    await prisma.passwordResetToken.delete({
      where: { id },
    });
  } catch (error) {
    throw error;
  }
};
