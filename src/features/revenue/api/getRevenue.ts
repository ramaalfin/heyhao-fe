import { z } from "zod";
import { BaseResponse } from "../../auth/types/response";
import { instanceApiWithToken } from "../../../shared/utils/axios";

export const getRevenueResponseSchema = z.object({
  balance: z.number(),
  total_vip_groups: z.number(),
  total_vip_members: z.number(),
  total_revenue: z.number(),
  latest_members: z.array(
    z.object({
      id: z.string(),
      owner_id: z.string(),
      user_id: z.string(),
      group_id: z.string(),
      price: z.number(),
      type: z.string(),
      created_at: z.string(),
      user: z.object({ name: z.string(), photo_url: z.string() }),
      group: z.object({
        name: z.string(),
        photo_url: z.string(),
        type: z.string(),
      }),
    }),
  ),
  transactionsPerMonths: z.record(z.string(), z.number()),
});

export type GetRevenueResponse = z.infer<typeof getRevenueResponseSchema>;

export const getRevenue = async (): Promise<
  BaseResponse<GetRevenueResponse>
> => {
  const response =
    await instanceApiWithToken.get<BaseResponse<GetRevenueResponse>>(
      "/revenue",
    );

  return response.data;
};
