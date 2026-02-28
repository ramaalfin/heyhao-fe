import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../api/updatePassword";
import { UpdatePasswordValues } from "../utils/schema";

export const useUpdatePassword = (token: string) => {
    const { mutateAsync, isPending, isError, error, isSuccess, reset } = useMutation({
        mutationFn: (data: UpdatePasswordValues) => updatePassword(data, token),
    });

    return {
        mutateAsync,
        isPending,
        isError,
        error,
        isSuccess,
        reset,
    };
};