"use client";
import UserInfo from "@/components/UserInfo";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const ClientPage = () => {
  const user = useCurrentUser();
  return (
    <div>{user && <UserInfo label="📱 Client  Component" user={user} />}</div>
  );
};
export default ClientPage;
