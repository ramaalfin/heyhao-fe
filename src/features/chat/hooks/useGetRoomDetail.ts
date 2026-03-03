import { useQuery } from "@tanstack/react-query";
import { getRoomDetail } from "../api/getRoomDetail";

export const useGetRoomDetail = (roomId: string | null) => {
  const {
    data: roomDetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["room", roomId],
    queryFn: () => getRoomDetail(roomId!),
    enabled: !!roomId,
    select: (data) => data.data.data,
  });

  return {
    roomDetail,
    isLoading,
    error,
  };
};
