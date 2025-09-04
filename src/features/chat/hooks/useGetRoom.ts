import { useQuery } from "@tanstack/react-query";
import { getRoom } from "../api/getRoom";

export const useGetRoom = (id: string) => {
  const {
    data: room,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["room", id],
    queryFn: () => getRoom(id),
    select: (data) => data.data,
    enabled: id !== "",
  });

  return {
    room,
    isLoading,
    isError,
    error,
  };
};
