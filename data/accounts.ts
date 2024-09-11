import prisma from "@/lib/db";

export const getAccountByUserId = async (id: string) => {
  try {
    const account = await prisma.account.findFirst({ where: { id } });
    return account;
  } catch (error) {
    throw error;
  }
};
