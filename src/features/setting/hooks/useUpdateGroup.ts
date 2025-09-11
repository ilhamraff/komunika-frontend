import { useMutation } from "@tanstack/react-query";
import { updateGroup } from "../api/updateGroup";

export const useUpdateGroup = (id: string) => {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (data: FormData) =>
      updateGroup(data, data.get("type") as string, id),
  });

  return {
    mutateAsync,
    isPending,
    isError,
    error,
  };
};
