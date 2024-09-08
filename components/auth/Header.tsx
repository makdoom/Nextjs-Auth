"use client";
import { cn } from "@/lib/utils";

type HeaderPropType = {
  label: string;
  heading?: string;
};

const Header = ({ label, heading = "" }: HeaderPropType) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <h2 className={cn("text-3xl font-semibold")}>
        {heading ? heading : "Auth 🔐"}
      </h2>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};
export default Header;
