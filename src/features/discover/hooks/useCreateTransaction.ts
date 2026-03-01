import { useMutation } from "@tanstack/react-query";
import { createTransaction } from "../api/createTransaction";

export const useCreateTransaction = () => {
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: createTransaction
    });

    return {
        mutateAsync,
        isPending,
        error
    };
};
