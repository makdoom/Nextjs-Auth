import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";

type ExtenedUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id?: string | null;
  role?: "ADMIN" | "USER";
  isTwoFactorEnabled?: string;
};
type UserInfoProps = {
  label: string;
  user?: ExtenedUser | undefined;
};

const UserInfo = ({ label, user }: UserInfoProps) => {
  console.log(user);
  return (
    <Card className="bg-secondary w-[600px] text-center">
      <CardHeader className="font-semibold text-xl">{label}</CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between border rounded-lg p-3 bg-white">
          <p className="text-sm font-medium">Id:</p>
          <p className="truncate text-xs p-1 font-mono bg-slate-100 rounded-sm">
            {user?.id}
          </p>
        </div>
        <div className="flex items-center justify-between border rounded-lg p-3 bg-white">
          <p className="text-sm font-medium">Name</p>
          <p className="truncate text-xs p-1 font-mono bg-slate-100 rounded-sm">
            {user?.name}
          </p>
        </div>
        <div className="flex items-center justify-between border rounded-lg p-3 bg-white">
          <p className="text-sm font-medium">Email</p>
          <p className="truncate text-xs p-1 font-mono bg-slate-100 rounded-sm">
            {user?.email}
          </p>
        </div>
        <div className="flex items-center justify-between border rounded-lg p-3 bg-white">
          <p className="text-sm font-medium">Role</p>
          <p className="truncate text-xs p-1 font-mono bg-slate-100 rounded-sm">
            {user?.role}
          </p>
        </div>
        <div className="flex items-center justify-between border rounded-lg p-3 bg-white">
          <p className="text-sm font-medium">Two Factor Authentication</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
export default UserInfo;
