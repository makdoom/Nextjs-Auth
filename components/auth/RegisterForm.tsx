"use client";

import CardWrapper from "@/components/wrappers/CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterSchemaType } from "@/schemas";
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
import { FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { register } from "@/actions/register";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterSchemaType) => {
    setIsLoading(true);
    const response = await register(values);
    setIsLoading(false);

    if (!response.success) return toast.error(response.message);

    if (response.message.includes("Email")) {
      toast.message(response.message, {
        description: `We have sent an confirmation email to ${values.email}.
        `,
      });
    } else {
      toast.success(response.message);
    }
    router.push("/auth/login");
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account ?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      type="text"
                      autoFocus
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      disabled={isLoading}
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
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full !mt-6" size="lg" disabled={isLoading}>
            {isLoading && <FiLoader className="h-5 w-5 animate-spin mr-2" />}
            Create Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
export default RegisterForm;
