import { useMutation } from "@tanstack/react-query";
import { joinGroup } from "../api/joinGroup";
import type { JoinGroupValues } from "../utils/Schema";

export const useJoinGroup = () => {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (data: JoinGroupValues) => joinGroup(data),
  });

  return {
    mutateAsync,
    isPending,
    isError,
    error,
  };
};
