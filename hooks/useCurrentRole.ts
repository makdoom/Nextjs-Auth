import { useCurrentUser } from "./useCurrentUser";

export const useCurrentRole = () => {
  const user = useCurrentUser();

  return user?.role;
};
