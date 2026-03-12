import { instanceApiWithToken } from "../../../shared/utils/axios";
import { BaseResponse } from "../../auth/types/response";

export const deleteGroupAsset = async (assetId: string) => {
  return instanceApiWithToken.delete<BaseResponse<any>>(`/groups/asset/${assetId}`);
};
