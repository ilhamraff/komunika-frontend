import { useQuery } from "@tanstack/react-query";
import { getDiscoverGroups } from "../api/getDiscoverGroups";

export const useDiscoverGroups = (isEnable: boolean, name = "") => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["search-groups", name],
    queryFn: () => getDiscoverGroups(name),
    select: (data) => data.data,
    enabled: isEnable,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
