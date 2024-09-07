import LoginButton from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const font = Inter({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function Home() {
  return (
    <main
      className={cn(
        "h-full flex flex-col justify-center items-center bg-gradient-to-r from-teal-400 to-gray-800",
        font.className
      )}
    >
      <div className="space-y-5 text-center">
        <h2 className="text-5xl text-white font-semibold drop-shadow-md">
          Authentication 🔐
        </h2>
        <p className="text-white text-lg">
          An advanced authentication service in Nextjs
        </p>

        <LoginButton>
          <Button variant="secondary" size="lg" className="font-bold">
            Try Out
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
