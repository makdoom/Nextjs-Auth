"use server";

import { auth } from "@/auth";

export const serverAuth = async () => {
  const session = await auth();

  return session?.user;
};
