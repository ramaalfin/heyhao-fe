import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminPayout } from "../api/updateAdminPayout";

export const useUpdateAdminPayout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateAdminPayout(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-payout"] });
    },
  });
};
