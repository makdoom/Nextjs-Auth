"use client";

import Link from "next/link";
import { Button } from "../ui/button";

type BackButtonPropType = {
  label: string;
  href: string;
};

const BackButton = ({ label, href }: BackButtonPropType) => {
  return (
    <Button variant="link" asChild size="sm" className="w-full font-sm">
      <Link href={href}>{label}</Link>
    </Button>
  );
};
export default BackButton;
