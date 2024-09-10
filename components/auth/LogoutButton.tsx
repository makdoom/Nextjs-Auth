import { signOut } from "next-auth/react";
import { ReactNode } from "react";

type LogoutButtonProps = {
  children?: ReactNode;
};
const LogoutButton = ({ children }: LogoutButtonProps) => {
  const logoutHandler = () => signOut();

  return (
    <div className="cursor-pointer" onClick={logoutHandler}>
      {children}
    </div>
  );
};
export default LogoutButton;
