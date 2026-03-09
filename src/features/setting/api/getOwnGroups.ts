import { instanceApiWithToken } from "../../../shared/utils/axios";
import { BaseResponse } from "../../auth/types/response";
import { OwnGroupsResponse } from "../schema/getOwnGroupsSchema";

export const getOwnGroups = async () => {
  return instanceApiWithToken.get<BaseResponse<OwnGroupsResponse>>(
    `/own-groups`,
  );
};
