"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CardWrapper from "../wrappers/CardWrapper";
import { FiLoader } from "react-icons/fi";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { newVerification } from "@/actions/verificationToken";

const NewVerificationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState("");

  const onSubmit = useCallback(async () => {
    if (!token) return;

    try {
      const response = await newVerification(token);
      if (!response.success) return setError(response.message);

      toast.success("Email verified successfully");
      router.push("/auth/login");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong whie verifying email");
      }
    }
    console.log(token);
  }, [token, router]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      heading="Verify ✅"
      headerLabel="Confirming your email address"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      <div className="flex w-full items-center justify-center">
        {error ? (
          <p className="text-destructive bg-red-100 rounded-md text-sm p-2 px-4">
            {error}
          </p>
        ) : (
          <FiLoader className="h-8 w-8 animate-spin" />
        )}
      </div>
    </CardWrapper>
  );
};
export default NewVerificationForm;
