import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "./_components/Navbar";

const SettingLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="bg-secondary h-full w-full flex flex-col gap-4  items-center justify-center bg-gradient-to-r from-teal-400 to-gray-800">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
};
export default SettingLayout;
