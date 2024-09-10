"use client";

import { useCurrentRole } from "@/hooks/useCurrentRole";
import { ReactNode } from "react";

type RoleGateProps = {
  children: ReactNode;
  allowedRole: "ADMIN" | "USER";
};
const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <div className="bg-red-200 p-3 rounded-md text-center">
        <p>You do not have permission to view this content</p>
      </div>
    );
  }
  return <>{children}</>;
};
export default RoleGate;
