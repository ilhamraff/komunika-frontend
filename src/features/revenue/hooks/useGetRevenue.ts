import { useQuery } from "@tanstack/react-query";
import { getRevenueStat } from "../api/getRevenueStat";

export const useGetRevenue = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["revenue-stat"],
    queryFn: () => getRevenueStat(),
    select: (data) => data.data,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
