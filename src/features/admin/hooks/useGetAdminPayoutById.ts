import { useQuery } from "@tanstack/react-query";
import { getAdminPayoutById } from "../api/updateAdminPayout";

export const useGetAdminPayoutById = (id: string) => {
  return useQuery({
    queryKey: ["admin-payout", id],
    queryFn: () => getAdminPayoutById(id),
    enabled: !!id,
  });
};
