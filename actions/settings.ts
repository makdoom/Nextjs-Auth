"use server";

import { getUserById } from "@/data/user";
import prisma from "@/lib/db";
import { serverAuth } from "@/lib/serverAuth";
import { SettingType } from "@/schemas";

export const updateSettings = async (values: SettingType) => {
  try {
    const user = await serverAuth();
    if (!user?.id) return { success: 0, message: "Unauthorized user" };

    const dbUser = await getUserById(user?.id);
    if (!dbUser) return { success: 0, message: "User not found" };

    await prisma.user.update({
      where: { id: dbUser.id },
      data: { ...values },
    });
  } catch (error) {
    throw error;
  }
};
