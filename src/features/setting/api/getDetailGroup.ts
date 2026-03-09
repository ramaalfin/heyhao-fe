import { instanceApiWithToken } from "../../../shared/utils/axios";
import { BaseResponse } from "../../auth/types/response";
import { DetailGroup } from "../schema/getDetailGroupSchema";

export const getDetailGroup = async (id: string) => {
  return instanceApiWithToken.get<BaseResponse<DetailGroup>>(`/groups/${id}`);
};
