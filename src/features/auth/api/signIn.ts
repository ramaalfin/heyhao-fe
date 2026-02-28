import { z } from "zod";
import instanceApi from "../../../shared/utils/axios";
import { BaseResponse } from "../types/response";
import { SignInValues } from "../utils/schema";

export const signInResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    photo: z.string(),
    token: z.string(),
});

export type SignInResponse = z.infer<typeof signInResponseSchema>;

export const signIn = async (data: SignInValues): Promise<BaseResponse<SignInResponse>> => {
    const response = await instanceApi.post<BaseResponse<SignInResponse>>("/auth/sign-in", data);

    return response.data;
};
