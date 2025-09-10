import { useQuery } from "@tanstack/react-query";
import { getGroup } from "../api/getGroup";

export const useGetGroup = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["setting-group-detail", id],
    queryFn: () => getGroup(id),
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
