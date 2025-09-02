import { useMutation } from "@tanstack/react-query";
import type { UpdatePasswordValues } from "../utils/schema";
import { updatePassword } from "../api/updatePassword";

export const useUpdatePassword = (token: string) => {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (data: UpdatePasswordValues) => updatePassword(token, data),
  });

  return {
    mutateAsync,
    isPending,
    isError,
    error,
  };
};
