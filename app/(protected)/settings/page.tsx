"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const SettingsPage = () => {
  const user = useCurrentUser();

  const signOutHandler = () => signOut();
  return (
    <div className="bg-white p-10 rounded-xl">
      <Button onClick={signOutHandler}>Logout</Button>
    </div>
  );
};
export default SettingsPage;
