import { useMutation } from "@tanstack/react-query";
import { signIn, SignInResponse } from "../api/signIn";
import { AxiosError } from "axios";
import { BaseResponse } from "../types/response";
import { SignInValues } from "../utils/schema";

export const useSignIn = () => {
    const { mutateAsync, isPending, isError, error } = useMutation<
        BaseResponse<SignInResponse>,
        AxiosError<BaseResponse<null>>,
        SignInValues
    >({
        mutationFn: (data: SignInValues) => signIn(data),
    });

    return {
        mutateAsync,
        isPending,
        isError,
        error,
    };
};
