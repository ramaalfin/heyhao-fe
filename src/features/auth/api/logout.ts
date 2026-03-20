import { instanceApiWithToken } from "../../../shared/utils/axios";
import { BaseResponse } from "../types/response";

export const logout = async (userId: string): Promise<BaseResponse<null>> => {
  const response = await instanceApiWithToken.post<BaseResponse<null>>("/auth/logout", {
    userId,
  });

  return response.data;
};
