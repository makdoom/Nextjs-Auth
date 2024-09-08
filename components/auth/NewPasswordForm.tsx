"use client";

import CardWrapper from "@/components/wrappers/CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema, NewPasswordSchemaType } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/newPassword";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: NewPasswordSchemaType) => {
    startTransition(() => {
      (async () => {
        try {
          if (values.password !== values.confirmPassword)
            return toast.error("Password don't match");

          if (!token) return toast.error("Token does not exists");

          const response = await newPassword(values, token);
          if (response.success) {
            toast.success("Password updated successfully");
            router.push("/auth/login");
          } else {
            toast.error(response.message);
          }
        } catch (error) {
          error instanceof Error
            ? toast.error(error.message)
            : toast.error("Something went wrong while updating password");
        }
      })();
    });
  };

  return (
    <CardWrapper
      heading="Change Your Password"
      headerLabel="Enter a new password below to update your password"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="New Password"
                      type="password"
                      disabled={isPending}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Confirm Password"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full !mt-6" size="lg" disabled={isPending}>
            {isPending && <FiLoader className="h-5 w-5 animate-spin mr-2" />}
            Update Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
export default NewPasswordForm;
