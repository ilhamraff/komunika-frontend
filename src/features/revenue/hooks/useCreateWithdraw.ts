import { useMutation } from "@tanstack/react-query";
import { createWithdraw, type WithdrawValues } from "../api/createWithdraw";

export const useCreateWithdraw = () => {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (data: WithdrawValues) => createWithdraw(data),
  });

  return {
    mutateAsync,
    isPending,
    isError,
    error,
  };
};
