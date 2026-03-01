import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinFreeGroup } from "../api/joinFreeGroup";

export const useJoinFreeGroup = () => {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: joinFreeGroup,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["detail-group"] });
        }
    });

    return {
        mutateAsync,
        isPending,
        error
    };
};
