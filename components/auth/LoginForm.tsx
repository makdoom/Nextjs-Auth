"use client";

import CardWrapper from "@/components/wrappers/CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "@/schemas";
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
import { login } from "@/actions/login";
import { useEffect, useState, useTransition } from "react";
import { FiLoader } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email address already in use"
      : "";
  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = (values: LoginSchemaType) => {
    try {
      startTransition(() => {
        (async () => {
          const response = await login(values);
          if (!response) return;

          if (response?.success) {
            if (response.message.includes("Email")) {
              toast.message(response.message, {
                description: `We have sent an confirmation email to ${values.email}.
                `,
              });
            }

            if (response?.twoFactor) {
              toast.message(response.message, {
                description: `We have sent 2FA code to ${values.email}.
                `,
              });
              setShowTwoFactor(true);
            }
          } else {
            toast.error(response?.message);
          }
        })();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (urlError) {
      toast.error(urlError);
    }
  }, [urlError]);

  useEffect(() => {
    if (showTwoFactor) {
      setTimeout(() => {
        form.setFocus("code");
        form.setValue("code", "");
      }, 0);
    }
  }, [showTwoFactor, form]);

  return (
    <CardWrapper
      heading={showTwoFactor ? "2FA Authentication" : "Auth 🔐"}
      headerLabel={showTwoFactor ? "Authenticate your account" : "Welcome back"}
      backButtonLabel="Don't have an account ?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            {showTwoFactor ? (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="123456"
                        type="text"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <>
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

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="********"
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />

                      <div className="flex justify-end">
                        <Button size="sm" variant="link" className="px-0">
                          <Link href="/auth/reset">Forgot Password</Link>
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <Button
            className="w-full !mt-6"
            size="lg"
            disabled={isPending}
            type="submit"
          >
            {isPending && <FiLoader className="h-5 w-5 animate-spin mr-2" />}
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
export default LoginForm;
