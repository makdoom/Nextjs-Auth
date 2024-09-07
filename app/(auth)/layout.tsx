import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center bg-gradient-to-r from-slate-900 to-slate-700">
      {children}
    </div>
  );
};
export default AuthLayout;
