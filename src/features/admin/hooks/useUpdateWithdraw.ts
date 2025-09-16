import { useMutation } from "@tanstack/react-query";
import { updateWithdraw } from "../api/updateWithdraw";

export const useUpdateWithdraw = (id: string) => {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (data: FormData) => updateWithdraw(id, data),
  });

  return {
    mutateAsync,
    isPending,
    isError,
    error,
  };
};
