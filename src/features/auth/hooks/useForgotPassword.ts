import { useMutation } from "@tanstack/react-query";
import { forgotPassword, ForgotPasswordResponse } from "../api/forgotPassword";
import { ForgotPasswordValues } from "../utils/schema";
import { AxiosError } from "axios";
import { BaseResponse } from "../types/response";

export const useForgotPassword = () => {
    const { mutateAsync, isPending, isError, error } = useMutation<BaseResponse<ForgotPasswordResponse>, AxiosError<BaseResponse<null>>, ForgotPasswordValues>({
        mutationFn: (data: ForgotPasswordValues) => forgotPassword(data),
    });

    return {
        mutateAsync,
        isPending,
        isError,
        error,
    };
}