import prisma from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique(
      {
        where: { userId },
      }
    );
    return twoFactorConfirmation;
  } catch (error) {
    throw error;
  }
};

export const createTwoFactorConfirmation = async (userId: string) => {
  try {
    await prisma.twoFactorConfirmation.create({
      data: { userId },
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export const deleteTwoFactorConfirmation = async (id: string) => {
  try {
    await prisma.twoFactorConfirmation.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    throw error;
  }
};
