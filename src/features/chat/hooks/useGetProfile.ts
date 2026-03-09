import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/getProfile";

export const useGetProfile = (userId: string | null) => {
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId!),
    enabled: !!userId,
    select: (data) => data.data.data,
  });

  return {
    profile,
    isLoading,
    error,
  };
};
