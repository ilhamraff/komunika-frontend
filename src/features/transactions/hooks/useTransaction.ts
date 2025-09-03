import { useQuery } from "@tanstack/react-query";
import { getTransaction } from "../api/getTransaction";

export const useTransaction = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["detail-transaction", id],
    queryFn: () => getTransaction(id ?? ""),
    select: (data) => data.data,
    enabled: id !== "",
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
