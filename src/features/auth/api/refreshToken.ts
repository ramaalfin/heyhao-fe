import { z } from "zod";
import { instanceApi } from "../../../shared/utils/axios";
import { BaseResponse } from "../types/response";

export const refreshTokenResponseSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
});

export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;

export const refreshToken = async (
  refreshToken: string,
): Promise<BaseResponse<RefreshTokenResponse>> => {
  const response = await instanceApi.post<BaseResponse<RefreshTokenResponse>>(
    "/auth/refresh-token",
    { refreshToken },
  );

  return response.data;
};
