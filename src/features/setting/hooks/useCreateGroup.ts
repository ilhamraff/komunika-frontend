import { useMutation } from "@tanstack/react-query";
import { createGroup } from "../api/createGroup";

export const useCreateGroup = () => {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (data: FormData) =>
      createGroup(data, data.get("type") as string),
  });

  return {
    mutateAsync,
    isPending,
    isError,
    error,
  };
};
