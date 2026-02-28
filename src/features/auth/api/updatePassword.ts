import { z } from "zod";
import { UpdatePasswordValues } from "../utils/schema";
import instanceApi from "../../../shared/utils/axios";
import { BaseResponse } from "../types/response";

export const updatePasswordSchema = z.object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
});

export type UpdatePasswordResponse = z.infer<typeof updatePasswordSchema>;

export const updatePassword = async (data: UpdatePasswordValues, token: string): Promise<BaseResponse<UpdatePasswordResponse>> => {
    const response = await instanceApi.put<BaseResponse<UpdatePasswordResponse>>(`/auth/forgot-password/${token}`, data);

    return response.data;
};