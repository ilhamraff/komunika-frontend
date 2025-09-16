import { useQuery } from "@tanstack/react-query";
import { getWithdraw } from "../api/getWithdraw";

export const useGetWithdraw = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-withdraw-history"],
    queryFn: () => getWithdraw(),
    select: (data) => data.data,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
