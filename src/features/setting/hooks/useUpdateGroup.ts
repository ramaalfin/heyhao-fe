import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFreeGroup, updatePaidGroup } from "../api/updateGroup";
import { CreateGroupFormValues } from "../schema/createGroupSchema";

export const useUpdateGroup = () => {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: CreateGroupFormValues }) => {
            if (payload.type === "PAID") {
                return updatePaidGroup(id, payload);
            } else {
                return updateFreeGroup(id, payload);
            }
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["detail-group", variables.id] });
            queryClient.invalidateQueries({ queryKey: ["own-groups"] });
        },
    });

    return {
        updateGroup: mutateAsync,
        isPending,
        error,
    };
};
