"use client";

import LoginForm from "@/components/auth/LoginForm";
import CardWrapper from "@/components/wrappers/CardWrapper";

const Login = () => {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account ?"
      backButtonHref="/register"
      showSocial
    >
      <LoginForm />
    </CardWrapper>
  );
};
export default Login;
