import { useQuery } from "@tanstack/react-query";
import { getAdminPayout } from "../api/getAdminPayout";

export const useGetAdminPayout = () => {
  return useQuery({
    queryKey: ["admin-payout"],
    queryFn: () => getAdminPayout(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
