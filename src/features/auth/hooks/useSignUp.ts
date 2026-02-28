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
    onSuccess: (response) => {
      console.log("Success Message:", response.message);
      console.log("Data:", response.data);
      console.log("Status Code: 200/201 (Success)");
    },
    onError: (error) => {
      console.log("Error Message:", error.response?.data?.message || error.message);
      console.log("Status Code:", error.response?.status);
    },
    onMutate: (data) => {
      console.log("Sending Form Data", data);
    },
    onSettled: (data, error) => {
      console.log("Settled", { data, error });
    },
  });

  return {
    mutateAsync,
    isPending,
    isError,
    error,
  };
};
