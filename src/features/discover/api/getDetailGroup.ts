import { z } from "zod";
import { instanceApiWithToken } from "../../../shared/utils/axios";
import { BaseResponse } from "../../auth/types/response";

export const getDetailGroupResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    about: z.string(),
    type: z.string(),
    photo_url: z.string(),
    assets: z.array(z.object({
        filename: z.string()
    })),
    room: z.object({
        members: z.array(z.object({
            user: z.object({
                name: z.string(),
                photo_url: z.string()
            })
        })),
        _count: z.object({
            members: z.number()
        })
    })
});

export type GetDetailGroupResponse = z.infer<typeof getDetailGroupResponseSchema>;

export const getDetailGroup = async (
    id: string
): Promise<BaseResponse<GetDetailGroupResponse>> => {
    const response = await instanceApiWithToken.get<BaseResponse<GetDetailGroupResponse>>(`/groups/${id}`);

    return response.data;
};
