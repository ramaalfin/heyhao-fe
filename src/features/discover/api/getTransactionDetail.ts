import { z } from "zod";
import { instanceApiWithToken } from "../../../shared/utils/axios";
import { BaseResponse } from "../../auth/types/response";

export const getTransactionDetailResponseSchema = z.object({
    created_at: z.string(),
    price: z.number(),
    type: z.string(),
    group: z.object({
        name: z.string(),
        room: z.object({
            _count: z.object({
                members: z.number()
            })
        }),
        photo_url: z.string()
    })
});

export type GetTransactionDetailResponse = z.infer<typeof getTransactionDetailResponseSchema>;

export const getTransactionDetail = async (
    id: string
): Promise<BaseResponse<GetTransactionDetailResponse>> => {
    const response = await instanceApiWithToken.get<BaseResponse<GetTransactionDetailResponse>>(`/transactions/${id}`);

    return response.data;
};
