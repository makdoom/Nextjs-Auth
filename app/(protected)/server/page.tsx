import UserInfo from "@/components/UserInfo";
import { serverAuth } from "@/lib/serverAuth";

const ServerPage = async () => {
  const user = await serverAuth();
  return (
    <div>{user && <UserInfo label="💻 Server Component" user={user} />}</div>
  );
};
export default ServerPage;
