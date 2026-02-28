import { z } from "zod";
import instanceApi from "../../../shared/utils/axios";
import { BaseResponse } from "../types/response";
import { ForgotPasswordValues } from "../utils/schema";

export const forgotPasswordResponseSchema = z.object({
    email: z.string(),
});

export type ForgotPasswordResponse = z.infer<typeof forgotPasswordResponseSchema>;

export const forgotPassword = async (data: ForgotPasswordValues): Promise<BaseResponse<ForgotPasswordResponse>> => {
    const response = await instanceApi.post<BaseResponse<ForgotPasswordResponse>>("/auth/forgot-password", data);

    return response.data;
};