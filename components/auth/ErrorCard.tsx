"use client";

import CardWrapper from "../wrappers/CardWrapper";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oopsy daisy ! Something went wrong !!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
      showSocial={false}
      heading="Error ⚠️"
    />
  );
};
export default ErrorCard;
