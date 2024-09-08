"use client";

import CardWrapper from "@/components/wrappers/CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema, ResetPasswordSchemaType } from "@/schemas";
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
import { resetPassword } from "@/actions/resetPassword";

const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ResetPasswordSchemaType) => {
    startTransition(() => {
      (async () => {
        const response = await resetPassword(values);
        if (response.success) {
          if (response.message.includes("Email")) {
            toast.message(response.message, {
              description: `We have sent an Password Reset email to ${values.email}.
              `,
            });
          }
        } else {
          toast.error(response.message);
        }
      })();
    });
  };

  return (
    <CardWrapper
      heading="Forgot Password ?"
      headerLabel="Dont' worry! It happens, we'll send you reset instructions"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@gmail.com"
                      type="email"
                      disabled={isPending}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full !mt-6" size="lg" disabled={isPending}>
            {isPending && <FiLoader className="h-5 w-5 animate-spin mr-2" />}
            Send Reset Email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
export default ResetPasswordForm;
