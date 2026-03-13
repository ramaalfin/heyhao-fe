import { createPayouts } from "../api/createPayouts";
import { useMutation } from "@tanstack/react-query";
import { PayoutPayload } from "../utils/schema";

export const useCreatePayouts = () => {
    const { mutateAsync, isPending, error, isError } = useMutation({
        mutationFn: (data: PayoutPayload) => createPayouts(data),
    });

    return {
        mutateAsync,
        isPending,
        error,
        isError,
    };
};