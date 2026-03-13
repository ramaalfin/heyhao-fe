import { instanceApiWithToken } from "../../../shared/utils/axios";
import { BaseResponse } from "../../auth/types/response";

export const getBalance = async (): Promise<BaseResponse<number>> => {
  const response = await instanceApiWithToken.get("/balance");
  return response.data;
};
