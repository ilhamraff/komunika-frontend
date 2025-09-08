import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/getProfile";

export const useGetProfile = (id: string) => {
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-profile", id],
    queryFn: () => getProfile(id),
    select: (data) => data.data,
    enabled: id !== "",
  });

  return {
    profile,
    isLoading,
    isError,
    error,
  };
};
