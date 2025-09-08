import { useMutation } from "@tanstack/react-query";
import { createRoom } from "../api/createRoom";

export const useCreateRoom = () => {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (data: { userId: string }) => createRoom(data.userId),
  });

  return {
    mutateAsync,
    isPending,
    isError,
    error,
  };
};
