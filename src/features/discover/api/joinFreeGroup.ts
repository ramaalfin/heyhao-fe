import { z } from "zod";
import { instanceApiWithToken } from "../../../shared/utils/axios";
import { BaseResponse } from "../../auth/types/response";

export const joinFreeGroupResponseSchema = z.boolean();

export type JoinFreeGroupResponse = z.infer<typeof joinFreeGroupResponseSchema>;

export const joinFreeGroup = async (
    groupId: string
): Promise<BaseResponse<JoinFreeGroupResponse>> => {
    const response = await instanceApiWithToken.post<BaseResponse<JoinFreeGroupResponse>>(`/groups/join`, {
        group_id: groupId
    });

    return response.data;
};
