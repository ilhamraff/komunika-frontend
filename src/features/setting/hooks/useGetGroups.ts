import { useQuery } from "@tanstack/react-query";
import { getGroups } from "../api/getGroups";

export const useGetGroups = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["setting-groups"],
    queryFn: () => getGroups(),
    select: (data) => data.data,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
