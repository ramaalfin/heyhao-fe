import { useMutation } from "@tanstack/react-query";
import { signUp, SignUpResponse } from "../api/signUp";
import { AxiosError } from "axios";
import { BaseResponse } from "../types/response";

export const useSignUp = () => {
  const { mutateAsync, isPending, isError, error } = useMutation<
    BaseResponse<SignUpResponse>,
    AxiosError<BaseResponse<null>>,
    FormData
  >({
    mutationFn: (data: FormData) => signUp(data),
  });

  return {
    mutateAsync,
    isPending,
    isError,
    error,
  };
};
