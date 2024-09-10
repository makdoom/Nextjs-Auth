"use client";

import UserProfile from "@/components/auth/UserProfile";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();

  return (
    <div className="bg-secondary flex justify-between items-center w-[600px] shadow-md p-4  rounded-xl">
      <div className="flex gap-2">
        <Button
          asChild
          variant={pathName == "/server" ? "default" : "secondary"}
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathName == "/client" ? "default" : "secondary"}
        >
          <Link href="/client">Client</Link>
        </Button>
        <Button
          asChild
          variant={pathName == "/admin" ? "default" : "secondary"}
        >
          <Link href="/admin">Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathName == "/settings" ? "default" : "secondary"}
        >
          <Link href="/settings">Setting</Link>
        </Button>
      </div>
      <UserProfile />
    </div>
  );
};
export default Navbar;
