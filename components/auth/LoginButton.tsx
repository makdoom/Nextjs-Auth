"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type LoginButtonProps = {
  children: ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

const LoginButton = ({ children, mode = "redirect" }: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <div>modal implementation</div>;
  }

  return (
    <div className="cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
};

export default LoginButton;
