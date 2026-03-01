import { z } from "zod";
import { instanceApiWithToken } from "../../../shared/utils/axios";
import { BaseResponse } from "../../auth/types/response";

export const getDiscoverPeopleResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    photo_url: z.string(),
    created_at: z.string()
});

export type GetDiscoverPeopleResponse = z.infer<typeof getDiscoverPeopleResponseSchema>;

export const getDiscoverPeople = async (
    name?: string
): Promise<BaseResponse<GetDiscoverPeopleResponse>> => {
    const response = await instanceApiWithToken.get<BaseResponse<GetDiscoverPeopleResponse>>("/peoples", {
        params: {
            name
        }
    });

    return response.data;
};