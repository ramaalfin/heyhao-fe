import { z } from "zod";
import { instanceApiWithToken } from "../../../shared/utils/axios";
import { BaseResponse } from "../../auth/types/response";

export const getDiscoverGroupResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    about: z.string(),
    type: z.string(),
    room: z.object({ _count: z.object({ members: z.number() }) }),
    photo_url: z.string()
});

export type GetDiscoverGroupResponse = z.infer<typeof getDiscoverGroupResponseSchema>;

export const getDiscoverGroup = async (
    query?: string
): Promise<BaseResponse<GetDiscoverGroupResponse>> => {
    const response = await instanceApiWithToken.get<BaseResponse<GetDiscoverGroupResponse>>("/groups", {
        params: {
            query
        }
    });

    return response.data;
};