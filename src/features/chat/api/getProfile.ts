import { instanceApiWithToken } from "../../../shared/utils/axios";
import { BaseResponse } from "../../auth/types/response";
import { ProfileResponse } from "../schema/getProfileSchema";

export const getProfile = async (id: string) => {
  return instanceApiWithToken.get<BaseResponse<ProfileResponse>>(
    `/user/profile/${id}`,
  );
};
