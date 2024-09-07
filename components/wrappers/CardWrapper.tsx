"use client";

import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header from "@/components/auth/Header";
import Social from "../auth/Social";
import BackButton from "../auth/BackButton";

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Inter({
  subsets: ["latin"],
});

type CardWrapperPropTypes = {
  children: ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial: boolean;
};

const CardWrapper = ({
  children,
  showSocial,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperPropTypes) => {
  return (
    <Card className={cn("w-[400px] shadow-md", font.className)}>
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>

      <CardContent>{children}</CardContent>

      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}

      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
export default CardWrapper;
