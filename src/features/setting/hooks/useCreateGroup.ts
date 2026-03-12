import { useMutation } from "@tanstack/react-query";
import { createFreeGroup, createPaidGroup } from "../api/createGroup";
import { CreateGroupFormValues } from "../schema/createGroupSchema";

export const useCreateGroup = () => {
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: (payload: CreateGroupFormValues) => {
            if (payload.type === "PAID") {
                return createPaidGroup(payload);
            } else {
                return createFreeGroup(payload);
            }
        },
    });

    return {
        createGroup: mutateAsync,
        isPending,
        error,
    };
};
