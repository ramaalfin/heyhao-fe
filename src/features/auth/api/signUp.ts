import { z } from "zod";
import instanceApi from "../../../shared/utils/axios";
import { BaseResponse } from "../types/response";

export const signUpResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  photo: z.string(),
  token: z.string(),
});

export type SignUpResponse = z.infer<typeof signUpResponseSchema>;

export const signUp = async (data: FormData): Promise<BaseResponse<SignUpResponse>> => {
  const response = await instanceApi.post<BaseResponse<SignUpResponse>>("/auth/sign-up", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
