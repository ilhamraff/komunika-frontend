import { useQuery } from "@tanstack/react-query";
import { getDiscoverPeoples } from "../api/getDiscoverPeoples";

export const useDiscoverPeoples = (isEnable: boolean, name = "") => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["search-peoples", name],
    queryFn: () => getDiscoverPeoples(name),
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
