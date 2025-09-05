import { useMutation } from "@tanstack/react-query";
import { createMessage } from "../api/createMessage";

export const useCreateMessage = () => {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (data: FormData) => createMessage(data),
  });

  return {
    mutateAsync,
    isPending,
    isError,
    error,
  };
};
