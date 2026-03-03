import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../api/getRooms";

export const useGetRooms = () => {
  const {
    data: rooms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => getRooms(),
    select: (data) => data.data.data,
  });

  return {
    rooms,
    isLoading,
    error,
  };
};
