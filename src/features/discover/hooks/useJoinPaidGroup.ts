import { useMutation } from "@tanstack/react-query";
import type { JoinGroupValues } from "../utils/Schema";
import { joinPaidGroup } from "../api/joinPaidGroup";

export const useJoinPaidGroup = () => {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (data: JoinGroupValues) => joinPaidGroup(data),
  });

  return {
    mutateAsync,
    isPending,
    isError,
    error,
  };
};
