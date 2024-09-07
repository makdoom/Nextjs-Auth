import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center bg-gradient-to-r from-teal-400 to-gray-800">
      {children}
    </div>
  );
};
export default AuthLayout;
