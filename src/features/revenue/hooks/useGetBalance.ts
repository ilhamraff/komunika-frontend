import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../api/getBalance";

export const useGetBalance = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["balance"],
    queryFn: () => getBalance(),
    select: (data) => data.data,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
