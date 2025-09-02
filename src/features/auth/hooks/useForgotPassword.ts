import { useMutation } from "@tanstack/react-query";
import type { ForgotPasswordValues } from "../utils/schema";
import { forgotPassword } from "../api/forgotPassword";

export const useForgotPassword = () => {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (data: ForgotPasswordValues) => forgotPassword(data),
  });

  return {
    mutateAsync,
    isPending,
    isError,
    error,
  };
};
