import { useMutation } from "@tanstack/react-query";
import { deleteAsset } from "../api/deleteAsset";

export const useDeleteAsset = () => {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (data: { id: string }) => deleteAsset(data.id),
  });

  return {
    mutateAsync,
    isPending,
    isError,
    error,
  };
};
