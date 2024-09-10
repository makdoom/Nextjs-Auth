"use client";

import RoleGate from "@/components/auth/RoleGate";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AdminPage = () => {
  return (
    <Card className="w-[600px]">
      <CardHeader className="text-center font-semibold text-xl">
        🔑 Admin
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole="ADMIN">
          <div className="bg-emerald-200 text-center p-3 rounded-md">
            <p>You are allowed to view this content</p>
          </div>
        </RoleGate>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
