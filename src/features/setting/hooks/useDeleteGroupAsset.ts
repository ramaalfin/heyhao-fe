import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroupAsset } from "../api/deleteGroupAsset";

export const useDeleteGroupAsset = () => {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: (assetId: string) => deleteGroupAsset(assetId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["detail-group"] });
        },
    });

    return {
        deleteAsset: mutateAsync,
        isPending,
        error,
    };
};
