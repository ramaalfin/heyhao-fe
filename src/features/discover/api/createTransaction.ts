import { z } from "zod";
import { instanceApiWithToken } from "../../../shared/utils/axios";
import { BaseResponse } from "../../auth/types/response";

export const createTransactionResponseSchema = z.object({
    token: z.string(),
    redirect_url: z.string()
});

export type CreateTransactionResponse = z.infer<typeof createTransactionResponseSchema>;

export const createTransaction = async (
    groupId: string
): Promise<BaseResponse<CreateTransactionResponse>> => {
    const response = await instanceApiWithToken.post<BaseResponse<CreateTransactionResponse>>(`/transactions`, {
        group_id: groupId
    });

    return response.data;
};
