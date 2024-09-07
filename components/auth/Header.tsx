"use client";
import { cn } from "@/lib/utils";

type HeaderPropType = {
  label: string;
};

const Header = ({ label }: HeaderPropType) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <h2 className={cn("text-3xl font-semibold")}>Auth 🔐</h2>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};
export default Header;
